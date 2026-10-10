import { afterEach, expect, test } from "bun:test"
import { type Collection, createCollection } from "@tanstack/db"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import {
  asPageRow,
  type PageRow,
} from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import { setStoreDiagnosticsSink } from "akasha/page/ui-store/modules/diagnostics/diagnostics.module.code.ts"
import { runPagesOptimisticMutation } from "akasha/page/ui-store/optimistic/modules/optimistic-mutation/optimistic-mutation.module.code.ts"
import type { PagesMutationPlan } from "akasha/page/ui-store/optimistic/modules/plan/plan.module.code.ts"

const VIEW_ID = "01a0e4a3-fd80-71ee-8f9b-20a086f6a0ee"

const NARROWS: Json = [{ key: "status", comparison: "is", values: ["draft"] }]

const SORTS: Json = [{ key: "updated-at", descending: true }]

const UNWAITED = { ceilingMs: 0, waitForTick: async () => {} }

function viewRow(attributes: Record<string, Json>): PageRow {
  return asPageRow({ id: VIEW_ID, page_type_slug: "view", attributes })
}

async function collectionOf(rows: readonly PageRow[]): Promise<Collection<PageRow, string>> {
  const collection = createCollection<PageRow, string>({
    id: `optimistic-mutation-${crypto.randomUUID()}`,
    getKey: (row) => row.id,
    startSync: true,
    sync: {
      sync: ({ begin, write, commit, markReady }) => {
        begin()
        for (const row of rows) write({ type: "insert", value: row })
        commit()
        markReady()
      },
    },
  })
  await collection.stateWhenReady()
  return collection
}

function viewEdit(attributes: Record<string, Json>): PagesMutationPlan {
  return { kind: "patch", rowId: VIEW_ID, overlay: { attributes } }
}

afterEach(() => {
  setStoreDiagnosticsSink(null)
})

test("a view edit naming the filters and sorts the screen already shows still sends its write and answers what the write answered", async () => {
  const collection = await collectionOf([viewRow({ narrows: NARROWS, viewSorts: SORTS })])
  let sent = 0
  const answer = await runPagesOptimisticMutation(
    collection,
    [viewEdit({ narrows: NARROWS, viewSorts: SORTS })],
    async () => {
      sent += 1
      return "landed"
    },
    UNWAITED
  )

  expect(answer).toBe("landed")
  expect(sent).toBe(1)
})

test("a view edit for a view the screen does not hold still sends its write", async () => {
  const collection = await collectionOf([])
  let sent = 0
  const answer = await runPagesOptimisticMutation(
    collection,
    [viewEdit({ narrows: NARROWS })],
    async () => {
      sent += 1
      return "landed"
    },
    UNWAITED
  )

  expect(answer).toBe("landed")
  expect(sent).toBe(1)
})

test("a view edit changing the filters shown sends its write once and answers what the write answered", async () => {
  setStoreDiagnosticsSink(() => undefined)
  const collection = await collectionOf([viewRow({ narrows: [] })])
  let sent = 0
  const answer = await runPagesOptimisticMutation(
    collection,
    [viewEdit({ narrows: NARROWS })],
    async () => {
      sent += 1
      return "landed"
    },
    UNWAITED
  )

  expect(answer).toBe("landed")
  expect(sent).toBe(1)
})

test("a write failing for an edit the screen already shows rejects with the write's own error", async () => {
  const collection = await collectionOf([viewRow({ narrows: NARROWS })])
  const landing = runPagesOptimisticMutation(
    collection,
    [viewEdit({ narrows: NARROWS })],
    async () => {
      throw new Error("the patch was refused")
    },
    UNWAITED
  )

  await expect(landing).rejects.toThrow("the patch was refused")
})

test("an edit repeated while the one before it is in flight is sent only after that one lands", async () => {
  setStoreDiagnosticsSink(() => undefined)
  const collection = await collectionOf([viewRow({ narrows: [] })])
  const sent: string[] = []
  const firstAnswer = Promise.withResolvers<string>()
  const first = runPagesOptimisticMutation(
    collection,
    [viewEdit({ narrows: NARROWS })],
    () => {
      sent.push("first")
      return firstAnswer.promise
    },
    UNWAITED
  )
  const second = runPagesOptimisticMutation(
    collection,
    [viewEdit({ narrows: NARROWS })],
    async () => {
      sent.push("second")
      return "second"
    },
    UNWAITED
  )
  await Bun.sleep(0)

  expect(sent).toEqual(["first"])
  firstAnswer.resolve("first")
  expect(await first).toBe("first")
  expect(await second).toBe("second")
  expect(sent).toEqual(["first", "second"])
})
