import { describe, expect, test } from "bun:test"
import { createPagesCollection } from "../collection/pages-collection"
import { id, row } from "./__fixtures__/view-pipeline-rows"
import {
  PERSON_TYPE,
  personTypeRow,
  TASK_TYPE,
  task,
  taskTypeRow,
} from "./_view-pipeline-test-helpers"
import { createViewPipeline } from "./view-pipeline"

const flush = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0))

describe("view pipeline — #15778 relation-target fold reactivity", () => {
  test("re-resolves a rollup 2nd sort when the TARGET rows fold in AFTER subscribe", async () => {
    const handle = createPagesCollection()
    try {
      await handle.collection.preload()
      handle.controller.seed([
        taskTypeRow(),
        personTypeRow(),
        task(1, { priority: 1, owner: id(10) }, { title: "AAA" }),
        task(2, { priority: 1, owner: id(11) }, { title: "BBB" }),
      ])
      const pipe = createViewPipeline(handle.collection, {
        pageTypeId: TASK_TYPE,
        sorts: [
          { by: "priority", dir: "asc" },
          { by: "ownerSortOrder", dir: "desc" },
          { by: "title", dir: "asc" },
        ],
      })
      try {
        let notifications = 0
        const unsubscribe = pipe.subscribe(() => {
          notifications += 1
        })
        try {
          expect(pipe.read().rows.map((r) => r.id)).toEqual([id(1), id(2)])

          notifications = 0

          handle.controller.seed([
            row({
              id: id(10),
              pageTypeId: PERSON_TYPE,
              slug: "person",
              attributes: { name: "A", sortOrder: 1 },
            }),
            row({
              id: id(11),
              pageTypeId: PERSON_TYPE,
              slug: "person",
              attributes: { name: "B", sortOrder: 5 },
            }),
          ])
          await flush()

          expect(notifications).toBeGreaterThan(0)

          expect(pipe.read().rows.map((r) => r.id)).toEqual([id(2), id(1)])
        } finally {
          unsubscribe()
        }
      } finally {
        pipe.dispose()
      }
    } finally {
      handle.cleanup()
    }
  })
})
