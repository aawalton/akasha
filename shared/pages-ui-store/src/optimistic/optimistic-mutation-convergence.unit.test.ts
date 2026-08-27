import { afterEach, describe, expect, test } from "bun:test"
import { isRecord } from "../../../utils-narrow/src/is-record"
import type { PageRow } from "../collection/page-row"
import { createPagesCollection } from "../collection/pages-collection"
import { type StoreDiagnostic, setStoreDiagnosticsSink } from "../diagnostics"
import { readCanonicalRow } from "./convergence"
import { runPagesOptimisticMutation } from "./optimistic-mutation"

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

interface Deferred<T> {
  readonly promise: Promise<T>
  readonly resolve: (value: T) => void
  readonly reject: (err: unknown) => void
}
function makeDeferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void
  let reject!: (err: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

function attrsOf(row: PageRow | undefined): unknown {
  return row?.attributes
}

async function flush(turns = 4): Promise<void> {
  for (let i = 0; i < turns; i += 1) await Promise.resolve()
}

function levelOf(collection: ReturnType<typeof createPagesCollection>["collection"]): unknown {
  const attrs = collection.get(ID)?.attributes
  return isRecord(attrs) ? attrs.safetyLevel : undefined
}

describe("runPagesOptimisticMutation — patch lifecycle", () => {
  test("a plain patch holds its overlay until the canonical row catches up (no stale repaint on RPC resolve)", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { label: "old" } })])

    const rpc = makeDeferred<string>()
    const result = runPagesOptimisticMutation(
      collection,
      [{ kind: "patch", rowId: ID, overlay: { attributes: { label: "new" } } }],
      async () => rpc.promise
    )

    expect(attrsOf(collection.get(ID))).toEqual({ label: "new" })
    expect(attrsOf(readCanonicalRow(collection, ID))).toEqual({ label: "old" })

    await Promise.resolve()
    expect(attrsOf(collection.get(ID))).toEqual({ label: "new" })

    rpc.resolve("server-ok")
    await flush()
    expect(attrsOf(collection.get(ID))).toEqual({ label: "new" })

    controller.applyUpserts([mkRow({ attributes: { label: "new" } })])
    await expect(result).resolves.toBe("server-ok")
    expect(attrsOf(collection.get(ID))).toEqual({ label: "new" })
    cleanup()
  })

  test("auto-reverts the overlay when the RPC throws", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { label: "old" } })])

    const rpc = makeDeferred<string>()
    const result = runPagesOptimisticMutation(
      collection,
      [{ kind: "patch", rowId: ID, overlay: { attributes: { label: "new" } } }],
      async () => rpc.promise
    )
    expect(attrsOf(collection.get(ID))).toEqual({ label: "new" })

    rpc.reject(new Error("server boom"))
    await expect(result).rejects.toThrow("server boom")
    expect(attrsOf(collection.get(ID))).toEqual({ label: "old" })
    cleanup()
  })

  test("applies an RFC-6902 attributesPatch after the shallow merge (server order)", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { keep: "yes", nested: { a: 1, b: 2 } } })])

    const rpc = makeDeferred<string>()
    const result = runPagesOptimisticMutation(
      collection,
      [
        {
          kind: "patch",
          rowId: ID,
          overlay: {
            attributes: { added: "shallow" },
            attributesPatch: [{ op: "replace", path: "/nested/a", value: 9 }],
          },
        },
      ],
      async () => rpc.promise,
      { ceilingMs: 40, tickMs: 5 }
    )

    expect(attrsOf(collection.get(ID))).toEqual({
      keep: "yes",
      added: "shallow",
      nested: { a: 9, b: 2 },
    })
    rpc.resolve("ok")
    await result
    cleanup()
  })

  test("derived patch holds through convergence, reading the buffered canonical", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { completedAt: "2026-01-01T00:00:00.000Z" } })])

    const rpc = makeDeferred<string>()
    const result = runPagesOptimisticMutation(
      collection,
      [
        {
          kind: "patch",
          rowId: ID,
          overlay: { attributes: { completedAt: null } },
          predictedSet: { completedAt: null },
        },
      ],
      async () => rpc.promise
    )

    expect(attrsOf(collection.get(ID))).toEqual({ completedAt: null })

    controller.applyUpserts([mkRow({ attributes: { completedAt: null } })])
    expect(attrsOf(readCanonicalRow(collection, ID))).toEqual({ completedAt: null })

    rpc.resolve("ok")
    await result
    expect(attrsOf(collection.get(ID))).toEqual({ completedAt: null })
    cleanup()
  })
})

describe("runPagesOptimisticMutation — a write the server accepted that never converges", () => {
  afterEach(() => {
    setStoreDiagnosticsSink(null)
  })

  test("reports the unconverged hold rather than dropping it, and still tells the caller the write landed", async () => {
    const seen: StoreDiagnostic[] = []
    setStoreDiagnosticsSink((d) => {
      seen.push(d)
    })

    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { label: "old" } })])

    const outcome = await runPagesOptimisticMutation(
      collection,
      [{ kind: "patch", rowId: ID, overlay: { attributes: { label: "new" } } }],
      async () => "server-said-ok",
      { ceilingMs: 40, tickMs: 5 }
    )

    expect(outcome).toBe("server-said-ok")
    expect(seen.map((d) => d.reason)).toEqual(["mutation-unconverged"])
    expect(seen[0]?.message).toContain(ID)
    expect(seen[0]?.detail).toContain("label")
    cleanup()
  })

  test("a converging write reports nothing", async () => {
    const seen: StoreDiagnostic[] = []
    setStoreDiagnosticsSink((d) => {
      seen.push(d)
    })

    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { label: "old" } })])

    const outcome = runPagesOptimisticMutation(
      collection,
      [{ kind: "patch", rowId: ID, overlay: { attributes: { label: "new" } } }],
      async () => "server-said-ok",
      { ceilingMs: 40, tickMs: 5 }
    )
    controller.applyUpserts([mkRow({ attributes: { label: "new" } })])

    expect(await outcome).toBe("server-said-ok")
    expect(seen).toEqual([])
    expect(attrsOf(collection.get(ID))).toEqual({ label: "new" })
    cleanup()
  })
})

describe("runPagesOptimisticMutation — rapid overlapping same-row patches (S7 flicker regression)", () => {
  function patch(rowId: string, level: number) {
    return [{ kind: "patch", rowId, overlay: { attributes: { safetyLevel: level } } }] as const
  }

  test("never repaints a stale value on a 3→4→3→4 toggle whose canonical sync-back lags the RPCs", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { safetyLevel: 3 } })])

    const rpcA = makeDeferred<string>()
    const rpcB = makeDeferred<string>()
    const rpcC = makeDeferred<string>()
    const pA = runPagesOptimisticMutation(collection, patch(ID, 4), async () => rpcA.promise)
    const pB = runPagesOptimisticMutation(collection, patch(ID, 3), async () => rpcB.promise)
    const pC = runPagesOptimisticMutation(collection, patch(ID, 4), async () => rpcC.promise)

    expect(levelOf(collection)).toBe(4)

    const seen: unknown[] = []
    const sub = collection.subscribeChanges(() => seen.push(levelOf(collection)))

    rpcA.resolve("ok")
    rpcB.resolve("ok")
    rpcC.resolve("ok")
    await flush()
    expect(levelOf(collection)).toBe(4)

    controller.applyUpserts([mkRow({ attributes: { safetyLevel: 4 } })])
    await pA
    await flush()
    controller.applyUpserts([mkRow({ attributes: { safetyLevel: 3 } })])
    await pB
    await flush()
    controller.applyUpserts([mkRow({ attributes: { safetyLevel: 4 } })])
    await pC

    sub.unsubscribe()

    expect(levelOf(collection)).toBe(4)
    expect(seen.every((v) => v === 4)).toBe(true)
    cleanup()
  })

  test("holds overlays in submission FIFO order — a later same-value edit does not drop onto an earlier identical canonical", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { safetyLevel: 0 } })])

    const rpcA = makeDeferred<string>()
    const rpcB = makeDeferred<string>()
    const rpcC = makeDeferred<string>()
    const pA = runPagesOptimisticMutation(collection, patch(ID, 4), async () => rpcA.promise)
    const pB = runPagesOptimisticMutation(collection, patch(ID, 3), async () => rpcB.promise)
    const pC = runPagesOptimisticMutation(collection, patch(ID, 4), async () => rpcC.promise)
    expect(levelOf(collection)).toBe(4)

    const seen: unknown[] = []
    const sub = collection.subscribeChanges(() => seen.push(levelOf(collection)))

    rpcA.resolve("ok")
    rpcB.resolve("ok")
    rpcC.resolve("ok")
    await flush()

    controller.applyUpserts([mkRow({ attributes: { safetyLevel: 4 } })])
    await pA
    await flush()
    expect(levelOf(collection)).toBe(4)

    controller.applyUpserts([mkRow({ attributes: { safetyLevel: 3 } })])
    await pB
    await flush()
    expect(levelOf(collection)).toBe(4)

    controller.applyUpserts([mkRow({ attributes: { safetyLevel: 4 } })])
    await pC

    sub.unsubscribe()
    expect(levelOf(collection)).toBe(4)
    expect(seen.every((v) => v === 4)).toBe(true)
    cleanup()
  })
})
