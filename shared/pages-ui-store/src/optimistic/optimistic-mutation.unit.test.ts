import { describe, expect, test } from "bun:test"
import type { PageRow } from "../collection/page-row"
import { createPagesCollection } from "../collection/pages-collection"
import { readCanonicalRow } from "./convergence"
import { runPagesOptimisticMutation } from "./optimistic-mutation"

const ID = "0190f3a0-1234-7abc-9def-000000000001"
const ID_B = "0190f3a0-1234-7abc-9def-000000000002"

function mkRow(overrides: Partial<PageRow> = {}): PageRow {
  return {
    id: ID,
    page_type_id: "0190f3a0-1234-7abc-9def-aaaaaaaaaaaa",
    user_id: "user-1",
    seq: 1,
    title: "task",
    icon: null,
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

describe("runPagesOptimisticMutation — per-kind overlays", () => {
  test("create inserts the client-minted row immediately (optimistic key == canonical key)", async () => {
    const { collection, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    const rpc = makeDeferred<string>()
    const row = mkRow({ attributes: { label: "fresh" } })
    const result = runPagesOptimisticMutation(
      collection,
      [{ kind: "create", row }],
      async () => rpc.promise
    )
    expect(collection.get(ID)?.id).toBe(ID)
    expect(attrsOf(collection.get(ID))).toEqual({ label: "fresh" })
    rpc.resolve("ok")
    await result
    cleanup()
  })

  test("hard-delete removes the row optimistically", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow()])
    const rpc = makeDeferred<string>()
    const result = runPagesOptimisticMutation(
      collection,
      [{ kind: "hard-delete", rowId: ID }],
      async () => rpc.promise
    )
    expect(collection.get(ID)).toBeUndefined()
    rpc.resolve("ok")
    await result
    cleanup()
  })

  test("upsert on an absent row inserts the full client-minted row", async () => {
    const { collection, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    const rpc = makeDeferred<string>()
    const row = mkRow({ attributes: { label: "fresh" } })
    const result = runPagesOptimisticMutation(
      collection,
      [{ kind: "upsert", rowId: ID, row, overlay: { attributes: { label: "ignored" } } }],
      async () => rpc.promise
    )
    expect(attrsOf(collection.get(ID))).toEqual({ label: "fresh" })
    rpc.resolve("ok")
    await result
    cleanup()
  })

  test("upsert on a present row applies the overlay (patch semantics)", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([mkRow({ attributes: { label: "old" } })])

    const rpc = makeDeferred<string>()
    const result = runPagesOptimisticMutation(
      collection,
      [
        {
          kind: "upsert",
          rowId: ID,
          row: mkRow({ attributes: { label: "would-insert" } }),
          overlay: { attributes: { label: "new" } },
        },
      ],
      async () => rpc.promise
    )
    expect(attrsOf(collection.get(ID))).toEqual({ label: "new" })
    expect(attrsOf(readCanonicalRow(collection, ID))).toEqual({ label: "old" })
    rpc.resolve("ok")
    await result
    expect(attrsOf(collection.get(ID))).toEqual({ label: "old" })
    cleanup()
  })
})

describe("runPagesOptimisticMutation — multi-row + mixed-kind, one transaction", () => {
  test("applies every plan under one RPC and reverts them all together on throw", async () => {
    const { collection, controller, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([
      mkRow({ id: ID, attributes: { label: "a-old" } }),
      mkRow({ id: ID_B, attributes: { label: "b-old" } }),
    ])

    const rpc = makeDeferred<string>()
    let rpcCalls = 0
    const result = runPagesOptimisticMutation(
      collection,
      [
        { kind: "patch", rowId: ID, overlay: { attributes: { label: "a-new" } } },
        { kind: "hard-delete", rowId: ID_B },
      ],
      async () => {
        rpcCalls += 1
        return rpc.promise
      }
    )

    expect(attrsOf(collection.get(ID))).toEqual({ label: "a-new" })
    expect(collection.get(ID_B)).toBeUndefined()
    expect(rpcCalls).toBe(1)

    rpc.reject(new Error("multi boom"))
    await expect(result).rejects.toThrow("multi boom")
    expect(attrsOf(collection.get(ID))).toEqual({ label: "a-old" })
    expect(attrsOf(collection.get(ID_B))).toEqual({ label: "b-old" })
    cleanup()
  })
})

describe("runPagesOptimisticMutation — empty plans", () => {
  test("no plans → pure passthrough returning the RPC value, no optimistic transaction", async () => {
    const { collection, cleanup } = createPagesCollection()
    collection.startSyncImmediate()
    await expect(
      runPagesOptimisticMutation(collection, [], async () => "passthrough")
    ).resolves.toBe("passthrough")
    cleanup()
  })
})
