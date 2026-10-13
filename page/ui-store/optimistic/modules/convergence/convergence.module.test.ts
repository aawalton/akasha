import { expect, test } from "bun:test"
import { type Collection, createCollection } from "@tanstack/db"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import {
  asPageRow,
  type PageRow,
} from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import {
  awaitConvergence,
  ConvergenceUnreached,
} from "akasha/page/ui-store/optimistic/modules/convergence/convergence.module.code.ts"

const TASK_ID = "019db533-f381-7d66-bb3d-ea4078fc9725"

const UNWAITED = { ceilingMs: 0, waitForTick: async () => {} }

async function collectionHolding(
  attributes: Record<string, Json>
): Promise<Collection<PageRow, string>> {
  const collection = createCollection<PageRow, string>({
    id: `convergence-${crypto.randomUUID()}`,
    getKey: (row) => row.id,
    startSync: true,
    sync: {
      sync: ({ begin, write, commit, markReady }) => {
        begin()
        write({
          type: "insert",
          value: asPageRow({ id: TASK_ID, page_type_slug: "to-do", attributes }),
        })
        commit()
        markReady()
      },
    },
  })
  await collection.stateWhenReady()
  return collection
}

test("a write clearing a value converges once the row comes back without that value", async () => {
  const collection = await collectionHolding({ toDoDueDate: "2026-10-13" })

  const reached = await awaitConvergence(
    collection,
    TASK_ID,
    { toDoLastCompletedAt: null, toDoCompletedAt: null },
    UNWAITED
  )

  expect(reached.generations).toBe(0)
})

test("a write clearing a value does not converge while the row still carries that value", async () => {
  const collection = await collectionHolding({ toDoCompletedAt: "2026-10-13T13:43:27.832Z" })

  const reached = awaitConvergence(collection, TASK_ID, { toDoCompletedAt: null }, UNWAITED)

  await expect(reached).rejects.toBeInstanceOf(ConvergenceUnreached)
})

test("a write setting a value does not converge while the row comes back without that value", async () => {
  const collection = await collectionHolding({})

  const reached = awaitConvergence(
    collection,
    TASK_ID,
    { toDoCompletedAt: "2026-10-13T13:43:27.832Z" },
    UNWAITED
  )

  await expect(reached).rejects.toBeInstanceOf(ConvergenceUnreached)
})
