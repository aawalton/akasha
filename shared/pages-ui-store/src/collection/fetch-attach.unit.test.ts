import { describe, expect, it } from "bun:test"
import {
  attachFetch,
  canonicalJson,
  type FetchImpl,
  filePagesPath,
  planFetchedRows,
  readAnswerCut,
  readAnswerRows,
} from "./fetch-attach"
import type { PageRow } from "./page-row"
import type { PagesSyncController } from "./sync-controller"

const STAMP = "2026-01-01T00:00:00.000Z"
const SLUG = "claude-account"

function id(n: number): string {
  return `019db533-0000-7000-8000-00000000000${n}`
}

function row(n: number, attributes: Record<string, unknown> = {}): PageRow {
  return {
    id: id(n),
    page_type_id: "019db533-f381-7454-a6e4-fed5397cfd84",
    user_id: "user-1",
    seq: 0,
    title: `Account ${n}`,
    icon: null,
    slug: null,
    created_at: STAMP,
    updated_at: STAMP,
    attributes,
    page_type_slug: SLUG,
    unique_key: null,
    status: null,
    completed_at: null,
    parent_key: null,
    favorited_at: null,
    last_viewed_at: null,
  }
}

interface Mirror {
  readonly controller: PagesSyncController
  readonly held: Map<string, PageRow>
  readonly seeded: readonly (readonly PageRow[])[]
  readonly updated: readonly (readonly PageRow[])[]
  readonly deleted: readonly (readonly string[])[]
  readonly live: readonly string[]
  readonly noteLive: (shapeKey: string) => void
  readonly delivered: Map<string, Set<string>>
}

function mirror(): Mirror {
  const held = new Map<string, PageRow>()
  const seeded: PageRow[][] = []
  const updated: PageRow[][] = []
  const deleted: string[][] = []
  const controller: PagesSyncController = {
    sync: () => () => undefined,
    seed: (rows) => {
      seeded.push([...rows])
      for (const r of rows) held.set(r.id, r)
    },
    applyUpserts: (rows) => {
      updated.push([...rows])
      for (const r of rows) held.set(r.id, r)
    },
    applyDeletes: (ids) => {
      deleted.push([...ids])
      for (const i of ids) held.delete(i)
    },
    resetAll: () => {
      held.clear()
    },
    isReady: () => true,
  }
  const live: string[] = []
  return {
    controller,
    held,
    seeded,
    updated,
    deleted,
    live,
    noteLive: (shapeKey) => {
      live.push(shapeKey)
    },
    delivered: new Map(),
  }
}

function answers(m: Mirror, plans: readonly (() => Response)[], pollMs: number) {
  let calls = 0
  const impl: FetchImpl = async (input) => {
    void input
    const make = plans[Math.min(calls, plans.length - 1)]
    calls += 1
    if (make === undefined) throw new Error("no answer configured")
    return make()
  }
  const stop = attachFetch(
    {
      controller: m.controller,
      getRow: (i) => m.held.get(i),
      deliveredByShape: m.delivered,
      onShapeLive: m.noteLive,
      fetchImpl: impl,
      pollMs,
    },
    SLUG
  )
  return { stop, count: () => calls }
}

function ok(rows: readonly PageRow[]): Response {
  return new Response(JSON.stringify({ rows }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}

function failed(status: number): Response {
  return new Response(JSON.stringify({ error: "nope" }), {
    status,
    headers: { "content-type": "application/json" },
  })
}

async function until(pred: () => boolean, label: string): Promise<void> {
  for (let i = 0; i < 400; i += 1) {
    if (pred()) return
    await new Promise((resolve) => setTimeout(resolve, 5))
  }
  throw new Error(`timed out waiting for ${label}`)
}

describe("filePagesPath", () => {
  it("is relative, so it lands on whichever origin mounted the store", () => {
    expect(filePagesPath(SLUG)).toBe("/api/pages/claude-account")
  })
})

describe("canonicalJson", () => {
  it("reads a reordered attributes map as the same value", () => {
    expect(canonicalJson({ b: 1, a: { d: 2, c: 3 } })).toBe(
      canonicalJson({ a: { c: 3, d: 2 }, b: 1 })
    )
  })

  it("still tells a real change apart", () => {
    expect(canonicalJson({ a: 1 })).not.toBe(canonicalJson({ a: 2 }))
  })
})

describe("readAnswerRows", () => {
  it("takes the rows the wire declares", () => {
    const rows = readAnswerRows({ rows: [row(1)] })
    expect(rows?.length).toBe(1)
  })

  it("refuses an answer whose rows do not match the page row shape", () => {
    expect(readAnswerRows({ rows: [{ id: "not-a-uuid" }] })).toBeNull()
  })

  it("refuses an answer carrying no rows key", () => {
    expect(readAnswerRows({ error: "nope" })).toBeNull()
  })
})

describe("readAnswerCut", () => {
  it("names the shortfall where the answer carries fewer pages than stand", () => {
    expect(readAnswerCut({ held: 10945 }, 5000)).toEqual({ carried: 5000, held: 10945 })
  })

  it("says nothing where the answer carries every page that stands", () => {
    expect(readAnswerCut({ held: 368 }, 368)).toBeNull()
  })

  it("says nothing where the answer states no count, since a short set cannot be told from a whole one", () => {
    expect(readAnswerCut({ rows: [] }, 0)).toBeNull()
  })
})

describe("planFetchedRows", () => {
  it("sends a row the collection does not hold to seed, not to update", () => {
    const plan = planFetchedRows([row(1)], new Set(), () => undefined)
    expect(plan.inserts.map((r) => r.id)).toEqual([id(1)])
    expect(plan.updates).toEqual([])
  })

  it("drops a row that matches what is already held", () => {
    const held = row(1)
    const plan = planFetchedRows([row(1)], new Set([id(1)]), () => held)
    expect(plan.inserts).toEqual([])
    expect(plan.updates).toEqual([])
    expect(plan.deletes).toEqual([])
  })

  it("deletes an id delivered before and absent now", () => {
    const plan = planFetchedRows([], new Set([id(1)]), () => row(1))
    expect(plan.deletes).toEqual([id(1)])
  })
})

describe("attachFetch", () => {
  it("a 200 seeds every row and marks the shape live", async () => {
    const m = mirror()
    const run = answers(m, [() => ok([row(1), row(2)])], 60_000)
    await until(() => m.live.length > 0, "the shape to go live")
    run.stop()
    expect(m.seeded.length).toBe(1)
    expect(m.seeded[0]?.map((r) => r.id)).toEqual([id(1), id(2)])
    expect(m.live).toEqual([SLUG])
  })

  it("a later poll answering the same rows writes nothing at all", async () => {
    const m = mirror()
    const run = answers(m, [() => ok([row(1), row(2)])], 1)
    await until(() => run.count() >= 3, "three polls")
    run.stop()
    expect(m.seeded.length).toBe(1)
    expect(m.updated.length).toBe(0)
    expect(m.deleted.length).toBe(0)
  })

  it("applies a changed row as an update", async () => {
    const m = mirror()
    const run = answers(
      m,
      [() => ok([row(1), row(2)]), () => ok([row(1), row(2, { usage: "91%" })])],
      1
    )
    await until(() => m.updated.length > 0, "the changed row")
    run.stop()
    expect(m.updated[0]?.map((r) => r.id)).toEqual([id(2)])
    expect(m.held.get(id(2))?.attributes).toEqual({ usage: "91%" })
  })

  it("deletes a row that stops being answered", async () => {
    const m = mirror()
    const run = answers(m, [() => ok([row(1), row(2)]), () => ok([row(1)])], 1)
    await until(() => m.deleted.length > 0, "the dropped row")
    run.stop()
    expect(m.deleted[0]).toEqual([id(2)])
    expect(m.held.has(id(2))).toBe(false)
  })

  it("a 503 on the first poll writes nothing and leaves the shape unready, so it degrades", async () => {
    const m = mirror()
    const run = answers(m, [() => failed(503)], 60_000)
    await until(() => run.count() >= 1, "the first poll")
    await new Promise((resolve) => setTimeout(resolve, 20))
    run.stop()
    expect(m.seeded.length).toBe(0)
    expect(m.live).toEqual([])
  })

  it("a 503 after a good answer keeps the rows already shown", async () => {
    const m = mirror()
    const run = answers(m, [() => ok([row(1), row(2)]), () => failed(503)], 1)
    await until(() => run.count() >= 3, "a poll past the failure")
    run.stop()
    expect(m.held.size).toBe(2)
    expect(m.deleted.length).toBe(0)
  })

  it("a 404 is held the same way — no rows cleared, no readiness claimed", async () => {
    const m = mirror()
    const run = answers(m, [() => failed(404)], 60_000)
    await until(() => run.count() >= 1, "the first poll")
    await new Promise((resolve) => setTimeout(resolve, 20))
    run.stop()
    expect(m.seeded.length).toBe(0)
    expect(m.live).toEqual([])
  })

  it("an unreachable workstation writes nothing rather than emptying the list", async () => {
    const m = mirror()
    let calls = 0
    const stop = attachFetch(
      {
        controller: m.controller,
        getRow: (i) => m.held.get(i),
        deliveredByShape: m.delivered,
        onShapeLive: m.noteLive,
        fetchImpl: async () => {
          calls += 1
          throw new Error("network down")
        },
        pollMs: 60_000,
      },
      SLUG
    )
    await until(() => calls >= 1, "the first poll")
    await new Promise((resolve) => setTimeout(resolve, 20))
    stop()
    expect(m.seeded.length).toBe(0)
    expect(m.live).toEqual([])
  })

  it("a malformed answer writes nothing, since a half answer would read as deletions", async () => {
    const m = mirror()
    const run = answers(
      m,
      [
        () =>
          new Response(JSON.stringify({ rows: [{ id: "not-a-uuid" }] }), {
            status: 200,
            headers: { "content-type": "application/json" },
          }),
      ],
      60_000
    )
    await until(() => run.count() >= 1, "the first poll")
    await new Promise((resolve) => setTimeout(resolve, 20))
    run.stop()
    expect(m.seeded.length).toBe(0)
    expect(m.live).toEqual([])
  })

  it("release stops the polling", async () => {
    const m = mirror()
    const run = answers(m, [() => ok([row(1)])], 1)
    await until(() => run.count() >= 2, "polling to be under way")
    run.stop()
    const settled = run.count()
    await new Promise((resolve) => setTimeout(resolve, 40))
    expect(run.count()).toBe(settled)
  })
})
