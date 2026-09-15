import { afterAll, expect, test } from "bun:test"
import {
  answering,
  askedIn,
  ROUND_AT,
  type Rounding,
  SERVICE_SLUG,
} from "akasha/check/modules/audit-listening/audit-listening.module.code.ts"
import { auditOne } from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import {
  checked,
  NOTHING,
  repoOf,
  scratch,
} from "akasha/check/modules/audit-serving/audit-serving.module.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  bindsFor,
  LOOPBACK,
  portFor,
} from "akasha/infrastructure/service/workstation/modules/service-binding/service-binding.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const NOTHING_RAN: Rounding = () => Promise.resolve({ ran: [], turned: [], refused: [] })

afterAll(scratch.sweep)

function asking(body: unknown, at: string = ROUND_AT, method: string = "POST"): Request {
  return new Request(`http://workstation${at}`, {
    method,
    body: method === "POST" ? JSON.stringify(body) : undefined,
    headers: { "content-type": "application/json" },
  })
}

async function refusalOf(answered: Response): Promise<string> {
  return String(((await answered.json()) as { refused?: unknown }).refused)
}

test("the port a round is asked for on is read from the page rather than written here", () => {
  const held = portFor(ROOT, SERVICE_SLUG)
  expect(held === null || typeof held === "number").toBe(true)
})

test("a root naming no such page states no port", () => {
  expect(portFor(scratch.rootFor("akasha-audit-listening-bare-"), SERVICE_SLUG)).toBeNull()
})

test("the host names bound are read from the page rather than written here", () => {
  expect(bindsFor(ROOT, SERVICE_SLUG)).toContain(LOOPBACK)
  expect(bindsFor(ROOT, SERVICE_SLUG)).not.toContain("0.0.0.0")
})

test("a page stating no host name leaves the loopback address bound alone", () => {
  const bare = scratch.rootFor("akasha-audit-listening-bare-")
  expect(bindsFor(bare, SERVICE_SLUG)).toEqual([LOOPBACK])
})

test("a body naming no check asks for every check that runs at audit", () => {
  expect(askedIn({})).toEqual({ checks: [] })
})

test("a body naming checks asks for those checks", () => {
  expect(askedIn({ checks: ["typecheck", "lint-clean"] })).toEqual({
    checks: ["typecheck", "lint-clean"],
  })
})

test("a body that is no JSON object is refused", () => {
  expect(askedIn([])).toEqual({ refused: "a round is asked for by a JSON object" })
  expect(askedIn("typecheck")).toEqual({ refused: "a round is asked for by a JSON object" })
  expect(askedIn(null)).toEqual({ refused: "a round is asked for by a JSON object" })
})

test("a name that is no string is refused rather than dropped", () => {
  expect(askedIn({ checks: ["typecheck", 7] })).toEqual({
    refused: "a round names the checks it asks for as `checks`, a list of slugs",
  })
  expect(askedIn({ checks: "typecheck" })).toEqual({
    refused: "a round names the checks it asks for as `checks`, a list of slugs",
  })
})

test("nothing is asked for at another path", async () => {
  const answered = await answering(asking({}, "/elsewhere"), NOTHING_RAN)
  expect(answered.status).toBe(404)
  expect(await refusalOf(answered)).toBe("nothing is asked at /elsewhere")
})

test("a round asked for by another method is refused", async () => {
  const answered = await answering(asking({}, ROUND_AT, "GET"), NOTHING_RAN)
  expect(answered.status).toBe(405)
  expect(await refusalOf(answered)).toContain("POST")
})

test("a body that is no JSON is refused rather than read as naming no check", async () => {
  const held = new Request(`http://workstation${ROUND_AT}`, { method: "POST", body: "{" })
  const answered = await answering(held, NOTHING_RAN)
  expect(answered.status).toBe(400)
  expect(await refusalOf(answered)).toBe("the body did not parse as JSON")
})

test("a body naming a check reaches the round with that check and no other", async () => {
  const handed: string[][] = []
  const answered = await answering(asking({ checks: ["typecheck"] }), (checks) => {
    handed.push([...checks])
    return Promise.resolve({ ran: [], turned: [], refused: [] })
  })
  expect(answered.status).toBe(200)
  expect(handed).toEqual([["typecheck"]])
})

test("what the round answered is the whole of what comes back", async () => {
  const answered = await answering(asking({}), () =>
    Promise.resolve({ ran: [], turned: ["typecheck"], refused: ["nobody was told"] })
  )
  expect(await answered.json()).toEqual({
    ran: [],
    turned: ["typecheck"],
    refused: ["nobody was told"],
  })
})

test("two rounds asked for over HTTP at once are answered by one run", async () => {
  const { root, made } = await repoOf(1)
  const one = checked("typecheck", root)
  const home = scratch.rootFor("akasha-audit-listening-home-")
  const over = { change: NOTHING, commit: made[0] ?? "" }
  let runs = 0
  const round: Rounding = async () => {
    const ran = await auditOne({
      root,
      home,
      check: one,
      over,
      asked: over.commit,
      run: async (): Promise<readonly Judged[]> => {
        runs += 1
        await new Promise((settle) => setTimeout(settle, 200))
        return []
      },
    })
    return { ran: [ran], turned: [], refused: [] }
  }
  const server = Bun.serve({
    port: 0,
    hostname: LOOPBACK,
    fetch: (request) => answering(request, round),
  })
  try {
    const ask = async (): Promise<unknown> => {
      const answered = await fetch(`${server.url.origin}${ROUND_AT}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ checks: ["typecheck"] }),
      })
      return await answered.json()
    }
    const [first, second] = await Promise.all([ask(), ask()])
    expect(runs).toBe(1)
    expect(first).toEqual(second)
  } finally {
    server.stop(true)
  }
})
