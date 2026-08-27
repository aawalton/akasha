import { describe, expect, it } from "bun:test"
import { z } from "zod"
import {
  ASK_CEILING_MS,
  askNamed,
  askTaking,
  type Fetcher,
  PAGE_QUERY_ORIGIN,
  pageQueryOrigin,
  patchPage,
  patchState,
  removePage,
  WRITE_CEILING_MS,
  writePage,
} from "./index"

const replying =
  (body: unknown, status: number): Fetcher =>
  () =>
    Promise.resolve(Response.json(body, { status }))

const unreachable: Fetcher = () => Promise.reject(new Error("ECONNREFUSED"))

const noNap = (): Promise<void> => Promise.resolve()

const NOTHING = { n: 0, rows: [], groups: [], value: null, over: null }

describe("pageQueryOrigin — what counts as a page having an origin of its own", () => {
  const STATED = z.string().optional()

  const withOrigin = (origin: unknown): string => {
    const had = Object.getOwnPropertyDescriptor(globalThis, "location")
    const stated = STATED.parse(process.env.PAGE_QUERY_ORIGIN)
    Object.defineProperty(globalThis, "location", { value: { origin }, configurable: true })
    Reflect.deleteProperty(process.env, "PAGE_QUERY_ORIGIN")
    try {
      return pageQueryOrigin()
    } finally {
      if (stated === undefined) Reflect.deleteProperty(process.env, "PAGE_QUERY_ORIGIN")
      else process.env.PAGE_QUERY_ORIGIN = stated
      if (had === undefined) Reflect.deleteProperty(globalThis, "location")
      else Object.defineProperty(globalThis, "location", had)
    }
  }

  it("reaches the page's own server where the page has a real origin", () => {
    expect(withOrigin("https://alanwalton.com")).toBe("https://alanwalton.com/api")
  })

  it("takes an opaque origin as no origin, because `null` is what one serialises to", () => {
    expect(withOrigin("null")).toBe(PAGE_QUERY_ORIGIN)
  })

  it("takes an empty origin as no origin", () => {
    expect(withOrigin("")).toBe(PAGE_QUERY_ORIGIN)
  })
})

describe("askNamed — one client, for every caller that asks the page query service", () => {
  it("asks the named query at the in-cluster address", async () => {
    let asking = ""
    await askNamed("claude-account-all", (url) => {
      asking = url
      return Promise.resolve(Response.json(NOTHING, { status: 200 }))
    })
    expect(asking).toBe(`${PAGE_QUERY_ORIGIN}/q/claude-account-all`)
  })

  it("gives up after the one ceiling every caller shares", async () => {
    let carried: AbortSignal | null | undefined
    await askNamed("claude-account-all", (_url, init) => {
      carried = init.signal
      return Promise.resolve(Response.json(NOTHING, { status: 200 }))
    })
    expect(ASK_CEILING_MS).toBe(5_000)
    expect(carried).toBeInstanceOf(AbortSignal)
  })

  it("carries `at` off each row, which is what names the file behind a page", async () => {
    const asked = await askNamed(
      "claude-account-all",
      replying(
        { n: 1, rows: [{ at: "fixture:zoo/animals/lion.md", values: { owner: "alan" } }] },
        200
      )
    )
    expect(asked.ok).toBe(true)
    if (asked.ok) expect(asked.answer.rows[0]?.at).toBe("fixture:zoo/animals/lion.md")
  })

  it("still reads a row that carries no `at`, which an aggregate query answers with", async () => {
    const asked = await askNamed("claude-accounts-mean-weekly-used", replying(NOTHING, 200))
    expect(asked.ok).toBe(true)
    if (asked.ok) expect(asked.answer.n).toBe(0)
  })

  it("names the status behind a refusal, so a caller can tell an unnamed query from an outage", async () => {
    const unnamed = await askNamed("nothing-all", replying({ error: "no query is named" }, 404))
    const outage = await askNamed(
      "claude-account-all",
      replying({ error: "unreached" }, 503),
      noNap
    )
    expect(unnamed.ok).toBe(false)
    expect(outage.ok).toBe(false)
    if (!unnamed.ok) expect(unnamed.status).toBe(404)
    if (!outage.ok) expect(outage.status).toBe(503)
  })

  it("asks again across a restart, because the service exits whenever the instructions move", async () => {
    let calls = 0
    const refusedTwice: Fetcher = () => {
      calls += 1
      if (calls <= 2) return Promise.reject(new Error("ECONNREFUSED"))
      return Promise.resolve(Response.json(NOTHING, { status: 200 }))
    }
    const asked = await askNamed("alerts-all", refusedTwice, noNap)
    expect(asked.ok).toBe(true)
    expect(calls).toBe(3)
  })

  it("gives up rather than asking forever, so a real outage still reaches the caller", async () => {
    let calls = 0
    const alwaysRefused: Fetcher = () => {
      calls += 1
      return Promise.reject(new Error("ECONNREFUSED"))
    }
    const asked = await askNamed("alerts-all", alwaysRefused, noNap)
    expect(asked.ok).toBe(false)
    expect(calls).toBe(4)
  })

  it("carries no status where the service was never reached at all", async () => {
    const asked = await askNamed("claude-account-all", unreachable, noNap)
    expect(asked.ok).toBe(false)
    if (!asked.ok) {
      expect(asked.status).toBeUndefined()
      expect(asked.why).toContain("went unasked")
    }
  })

  it("takes a reply in a shape it cannot read as no answer at all", async () => {
    const asked = await askNamed("claude-account-all", replying({ rows: [] }, 200))
    expect(asked.ok).toBe(false)
  })

  it("takes a reply that is not JSON as no answer at all", async () => {
    const asked = await askNamed("claude-account-all", () =>
      Promise.resolve(new Response("<html>", { status: 200 }))
    )
    expect(asked.ok).toBe(false)
    if (!asked.ok) expect(asked.why).toContain("not JSON")
  })
})

const LANDED = { ok: true, at: "seats/astra.md" }

const CARRIED_BODY = z.record(z.string(), z.unknown())

function parseCarriedBody(carried: string): Record<string, unknown> {
  return CARRIED_BODY.parse(JSON.parse(carried))
}

describe("the write client — one writer, for every pod that writes a file-backed page", () => {
  it("posts the act, the page type and the name as the path, and the writer with the values as the body", async () => {
    let posting = ""
    let method: string | undefined
    let carried = ""
    await writePage("seat", "astra", { presence: true }, "worker-supervisor", (url, init) => {
      posting = url
      method = init.method
      carried = String(init.body)
      return Promise.resolve(Response.json(LANDED, { status: 200 }))
    })
    expect(posting).toBe(`${PAGE_QUERY_ORIGIN}/write/seat/astra`)
    expect(method).toBe("POST")
    expect(parseCarriedBody(carried)).toEqual({
      writer: "worker-supervisor",
      values: { presence: true },
    })
  })

  it("keeps a nested name's slashes as path segments, so a page under a folder is reachable", async () => {
    let posting = ""
    await patchPage("finding", "pages-system/write-route", { open: true }, "astra", (url) => {
      posting = url
      return Promise.resolve(Response.json(LANDED, { status: 200 }))
    })
    expect(posting).toBe(`${PAGE_QUERY_ORIGIN}/patch/finding/pages-system/write-route`)
  })

  it("gives a write its own ceiling, wider than a read's, because a commit can wait on the landing lock", async () => {
    let carried: AbortSignal | null | undefined
    await patchState(
      "persona",
      "astra",
      { lastMessagedAt: "2026-08-19" },
      "route",
      (_url, init) => {
        carried = init.signal
        return Promise.resolve(Response.json(LANDED, { status: 200 }))
      }
    )
    expect(WRITE_CEILING_MS).toBeGreaterThan(ASK_CEILING_MS)
    expect(carried).toBeInstanceOf(AbortSignal)
  })

  it("sends a remove with the writer alone, a removal carrying no values", async () => {
    let posting = ""
    let carried = ""
    await removePage("seat", "astra", "reaper", (url, init) => {
      posting = url
      carried = String(init.body)
      return Promise.resolve(Response.json(LANDED, { status: 200 }))
    })
    expect(posting).toBe(`${PAGE_QUERY_ORIGIN}/remove/seat/astra`)
    expect(parseCarriedBody(carried)).toEqual({ writer: "reaper" })
  })

  it("hands back where the write landed, which is what names the file behind the page", async () => {
    const landed = await writePage("seat", "astra", {}, "route", () =>
      Promise.resolve(Response.json(LANDED, { status: 200 }))
    )
    expect(landed.ok).toBe(true)
    if (landed.ok) expect(landed.at).toBe("seats/astra.md")
  })

  it("carries the status and the service's own reason behind a refusal, so a caller can tell a bad body from an outage", async () => {
    const refused = await writePage("nothing", "astra", {}, "route", () =>
      Promise.resolve(
        Response.json(
          { error: "`nothing` is not a file-backed page type this service writes" },
          { status: 404 }
        )
      )
    )
    expect(refused.ok).toBe(false)
    if (!refused.ok) {
      expect(refused.status).toBe(404)
      expect(refused.why).toContain("not a file-backed page type")
    }
  })

  it("carries no status where the service was never reached at all", async () => {
    const landed = await writePage("seat", "astra", {}, "route", () =>
      Promise.reject(new Error("ECONNREFUSED"))
    )
    expect(landed.ok).toBe(false)
    if (!landed.ok) {
      expect(landed.status).toBeUndefined()
      expect(landed.why).toContain("never landed")
    }
  })

  it("takes a reply in a shape this writer cannot read as no landing, an ok it cannot verify being none", async () => {
    const landed = await writePage("seat", "astra", {}, "route", () =>
      Promise.resolve(Response.json({ done: true }, { status: 200 }))
    )
    expect(landed.ok).toBe(false)
  })
})

describe("askNamed and askTaking — a nested value the service carries as text reads back as the record it is", () => {
  const CARRYING = {
    n: 1,
    rows: [
      {
        at: "fixture:zoo/traits/task-daily-opened.md",
        values: {
          trigger: '{"kind":"schedule","rrule":"FREQ=DAILY"}',
          actions: '[{"kind":"create_page","pageTypeSlug":"daily-tracking"}]',
          result: "1-0",
          ply: "4",
          rated: "false",
          title: "Daily tracking opened",
        },
      },
    ],
    groups: [],
    value: null,
    over: null,
  }

  it("hands askNamed's caller a record it can read a field off", async () => {
    const asked = await askNamed("enabled-automations", replying(CARRYING, 200))
    expect(asked.ok).toBe(true)
    if (!asked.ok) return
    const values = asked.answer.rows[0]?.values
    const trigger = z.object({ kind: z.string() }).parse(values?.trigger)
    const actions = z.array(z.object({ kind: z.string() })).parse(values?.actions)
    expect(trigger.kind).toBe("schedule")
    expect(actions[0]?.kind).toBe("create_page")
  })

  it("hands askTaking's caller the same", async () => {
    const asked = await askTaking(
      "episodes-watched-on-day",
      { day: "2026-08-19" },
      replying(CARRYING, 200)
    )
    expect(asked.ok).toBe(true)
    if (!asked.ok) return
    const trigger = z.object({ rrule: z.string() }).parse(asked.answer.rows[0]?.values.trigger)
    expect(trigger.rrule).toBe("FREQ=DAILY")
  })

  it("leaves text a file states as text, so a chess result stays a result", async () => {
    const asked = await askNamed("chess-games-played", replying(CARRYING, 200))
    expect(asked.ok).toBe(true)
    if (!asked.ok) return
    const values = asked.answer.rows[0]?.values
    expect(values?.result).toBe("1-0")
    expect(values?.ply).toBe("4")
    expect(values?.rated).toBe("false")
    expect(values?.title).toBe("Daily tracking opened")
  })

  it("carries `at`, `n`, `value` and `over` through untouched", async () => {
    const asked = await askNamed("enabled-automations", replying(CARRYING, 200))
    expect(asked.ok).toBe(true)
    if (!asked.ok) return
    expect(asked.answer.rows[0]?.at).toBe("fixture:zoo/traits/task-daily-opened.md")
    expect(asked.answer.n).toBe(1)
    expect(asked.answer.value).toBe(null)
    expect(asked.answer.over).toBe(null)
  })
})
