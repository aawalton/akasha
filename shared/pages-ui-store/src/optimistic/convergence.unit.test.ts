import { describe, expect, test } from "bun:test"
import { FILE_BACKING_POLL_MS } from "../collection/fetch-attach"
import type { PageRow } from "../collection/page-row"
import { createPagesCollection } from "../collection/pages-collection"
import {
  awaitConvergence,
  CONVERGENCE_CEILING_MS,
  ConvergenceUnreached,
  DEFAULT_TICK_MS,
  predictedSetSatisfied,
  readCanonicalRow,
} from "./convergence"

const ID = "0190f3a0-1234-7abc-9def-000000000001"

function mkRow(overrides: Partial<PageRow> = {}): PageRow {
  return {
    id: ID,
    page_type_id: "0190f3a0-1234-7abc-9def-aaaaaaaaaaaa",
    user_id: "user-1",
    seq: 1,
    title: "task",
    icon: null,
    created_at: "2026-05-24T00:00:00.000Z",
    updated_at: "2026-05-24T00:00:00.000Z",
    attributes: {},
    page_type_slug: "temper-task",
    unique_key: null,
    status: null,
    completed_at: null,
    slug: null,
    parent_key: null,
    ...overrides,
  }
}

function tickThat(effect: (generation: number) => void): (g: number) => Promise<void> {
  return async (g) => {
    effect(g)
  }
}

function fakeClock(stepMs: number): { now: () => number; tick: () => Promise<void> } {
  let at = 0
  return {
    now: () => at,
    tick: async () => {
      at += stepMs
    },
  }
}

describe("readCanonicalRow", () => {
  test("returns the synced row on the drained (no-persist) path", () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { completedAt: "2026-01-01" } })])
    const row = readCanonicalRow(collection, ID)
    expect(row?.attributes).toEqual({ completedAt: "2026-01-01" })
    cleanup()
  })

  test("returns undefined for an absent id", () => {
    const { collection, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    expect(readCanonicalRow(collection, "missing")).toBeUndefined()
    cleanup()
  })
})

describe("predictedSetSatisfied", () => {
  test("true iff every predicted key deep-equals the canonical attribute", () => {
    const row = mkRow({ attributes: { completedAt: null, streak: 3 } })
    expect(predictedSetSatisfied({ completedAt: null }, row)).toBe(true)
    expect(predictedSetSatisfied({ completedAt: null, streak: 3 }, row)).toBe(true)
    expect(predictedSetSatisfied({ completedAt: "x" }, row)).toBe(false)
    expect(predictedSetSatisfied({ streak: 3 }, row)).toBe(true)
  })
})

describe("the convergence ceiling is the ceiling of the thing it waits for", () => {
  test("a file-backed write can only converge on the poll that carries it, so the ceiling reaches at least one poll", () => {
    expect(CONVERGENCE_CEILING_MS).toBeGreaterThanOrEqual(FILE_BACKING_POLL_MS)
  })

  test("the ceiling a fixed generation count used to buy would not have reached one poll", () => {
    expect(5 * DEFAULT_TICK_MS).toBeLessThan(FILE_BACKING_POLL_MS)
  })
})

describe("awaitConvergence", () => {
  test("converges immediately (0 generations) when canonical already satisfies", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { completedAt: null } })])
    const res = await awaitConvergence(
      collection,
      ID,
      { completedAt: null },
      {
        now: () => 0,
        waitForTick: tickThat(() => {}),
      }
    )
    expect(res).toEqual({ generations: 0, elapsedMs: 0 })
    cleanup()
  })

  test("converges on a later tick when the canonical payload lands mid-wait", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { completedAt: "2026-01-01T00:00:00.000Z" } })])
    let landed = false
    const clock = fakeClock(250)
    const res = await awaitConvergence(
      collection,
      ID,
      { completedAt: null },
      {
        now: clock.now,
        waitForTick: async (g) => {
          await clock.tick()
          tickThat(() => {
            if (!landed) {
              controller.applyUpserts([mkRow({ attributes: { completedAt: null } })])
              landed = true
            }
          })(g)
        },
      }
    )
    expect(res).toEqual({ generations: 1, elapsedMs: 250 })
    cleanup()
  })

  test("throws at the ceiling when the canonical row never satisfies, naming the row and the keys", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { completedAt: "still-set" } })])
    const clock = fakeClock(250)
    const thrown = await awaitConvergence(
      collection,
      ID,
      { completedAt: null },
      {
        ceilingMs: 1000,
        now: clock.now,
        waitForTick: clock.tick,
      }
    ).then(
      () => null,
      (err: unknown) => err
    )
    expect(thrown).toBeInstanceOf(ConvergenceUnreached)
    if (!(thrown instanceof ConvergenceUnreached)) {
      throw new Error(`expected a ConvergenceUnreached, got ${String(thrown)}`)
    }
    expect(thrown.rowId).toBe(ID)
    expect(thrown.keys).toEqual(["completedAt"])
    expect(thrown.generations).toBe(4)
    expect(thrown.elapsedMs).toBe(1000)
    cleanup()
  })

  test("throws at the ceiling when the row never arrives", async () => {
    const { collection, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    const clock = fakeClock(250)
    await expect(
      awaitConvergence(
        collection,
        "never-arrives",
        { completedAt: null },
        {
          ceilingMs: 500,
          now: clock.now,
          waitForTick: clock.tick,
        }
      )
    ).rejects.toBeInstanceOf(ConvergenceUnreached)
    cleanup()
  })

  test("holds past the ceiling a fixed five generations would have given, when the row lands after it", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { completedAt: "2026-01-01T00:00:00.000Z" } })])
    const clock = fakeClock(DEFAULT_TICK_MS)
    const res = await awaitConvergence(
      collection,
      ID,
      { completedAt: null },
      {
        now: clock.now,
        waitForTick: async (g) => {
          await clock.tick()
          if (g === 40) controller.applyUpserts([mkRow({ attributes: { completedAt: null } })])
        },
      }
    )
    expect(res.generations).toBe(41)
    expect(res.elapsedMs).toBeGreaterThan(5 * DEFAULT_TICK_MS)
    cleanup()
  })

  test("default tick wakes on a real collection change (no injected tick)", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { completedAt: "2026-01-01T00:00:00.000Z" } })])
    queueMicrotask(() => {
      controller.applyUpserts([mkRow({ attributes: { completedAt: null } })])
    })
    const res = await awaitConvergence(collection, ID, { completedAt: null }, { tickMs: 1000 })
    expect(res.generations).toBeLessThanOrEqual(1)
    cleanup()
  })
})
