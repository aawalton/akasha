import { describe, expect, test } from "bun:test"
import { id, row } from "./__fixtures__/view-pipeline-rows"
import {
  PERSON_TYPE,
  personTypeRow,
  readIds,
  TASK_TYPE,
  task,
  taskTypeRow,
} from "./_view-pipeline-test-helpers"

describe("view pipeline — cross-type source (favorites)", () => {
  const FAV = (iso: string): Record<string, unknown> => ({ favoritedAt: iso })

  test("cross-type filtered+sorted set interleaves rows from every page type", async () => {
    const rows = [
      taskTypeRow(),
      personTypeRow(),
      task(1, FAV("2020-03-01T00:00:00.000Z")),
      task(2, {}),
      row({
        id: id(10),
        pageTypeId: PERSON_TYPE,
        slug: "person",
        attributes: FAV("2020-05-01T00:00:00.000Z"),
      }),
      row({
        id: id(11),
        pageTypeId: PERSON_TYPE,
        slug: "person",
        attributes: FAV("2020-01-01T00:00:00.000Z"),
      }),
      row({ id: id(12), pageTypeId: PERSON_TYPE, slug: "person", attributes: {} }),
    ]
    const { ids, count } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      crossType: true,
      filters: [{ key: "favoritedAt", isNotEmpty: true }],
      sorts: [{ by: "favoritedAt", dir: "desc" }],
    })
    expect(ids).toEqual([id(10), id(1), id(11)])
    expect(count).toBe(3)
  })

  test("cross-type limit truncates the streamed window; totalCount is the full filtered size", async () => {
    const rows = [
      taskTypeRow(),
      personTypeRow(),
      task(1, FAV("2020-03-01T00:00:00.000Z")),
      row({
        id: id(10),
        pageTypeId: PERSON_TYPE,
        slug: "person",
        attributes: FAV("2020-05-01T00:00:00.000Z"),
      }),
      row({
        id: id(11),
        pageTypeId: PERSON_TYPE,
        slug: "person",
        attributes: FAV("2020-01-01T00:00:00.000Z"),
      }),
    ]
    const { ids, count } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      crossType: true,
      filters: [{ key: "favoritedAt", isNotEmpty: true }],
      sorts: [{ by: "favoritedAt", dir: "desc" }],
      limit: 2,
    })
    expect(ids).toEqual([id(10), id(1)])
    expect(count).toBe(3)
  })

  test("without crossType the same placeholder pageTypeId scopes to one type (guards the flag's effect)", async () => {
    const rows = [
      taskTypeRow(),
      personTypeRow(),
      task(1, FAV("2020-03-01T00:00:00.000Z")),
      row({
        id: id(10),
        pageTypeId: PERSON_TYPE,
        slug: "person",
        attributes: FAV("2020-05-01T00:00:00.000Z"),
      }),
    ]
    const { ids, count } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      filters: [{ key: "favoritedAt", isNotEmpty: true }],
      sorts: [{ by: "favoritedAt", dir: "desc" }],
    })
    expect(ids).toEqual([id(1)])
    expect(count).toBe(1)
  })
})
