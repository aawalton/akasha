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

describe("view pipeline — Tier 1 fast-path stored sort", () => {
  test("multi-key sort applies view NULLS FIRST (asc) then id-asc tiebreak", async () => {
    const rows = [
      taskTypeRow(),
      task(1, { priority: 2 }),
      task(2, {}),
      task(3, { priority: 1 }),
      task(4, { priority: 2 }),
    ]
    const { ids, count } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      sorts: [{ by: "priority", dir: "asc" }],
    })
    expect(ids).toEqual([id(2), id(3), id(1), id(4)])
    expect(count).toBe(4)
  })

  test("desc places nulls last", async () => {
    const rows = [taskTypeRow(), task(1, { priority: 2 }), task(2, {}), task(3, { priority: 5 })]
    const { ids } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      sorts: [{ by: "priority", dir: "desc" }],
    })
    expect(ids).toEqual([id(3), id(1), id(2)])
  })
})

describe("view pipeline — Tier 2 instant", () => {
  test("instant sort orders ISO-string values chronologically", async () => {
    const rows = [
      taskTypeRow(),
      task(1, { due: "2020-03-01T00:00:00.000Z" }),
      task(2, { due: "2020-01-01T00:00:00.000Z" }),
      task(3, {}),
    ]
    const { ids } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      sorts: [{ by: "due", dir: "asc" }],
    })
    expect(ids).toEqual([id(3), id(2), id(1)])
  })

  test("instant FILTER coerces stored ISO against ms-epoch operand", async () => {
    const threshold = Date.parse("2020-02-01T00:00:00.000Z")
    const rows = [
      taskTypeRow(),
      task(1, { due: "2020-03-01T00:00:00.000Z" }),
      task(2, { due: "2020-01-01T00:00:00.000Z" }),
      task(3, { due: "2020-02-15T00:00:00.000Z" }),
    ]
    const { ids, count } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      filters: [{ key: "due", gt: threshold }],
      sorts: [{ by: "seq", dir: "asc" }],
    })
    expect(ids).toEqual([id(1), id(3)])
    expect(count).toBe(2)
  })
})

describe("view pipeline — Tier 3 relation-target sort", () => {
  test("orders by target sortOrder → title → raw id", async () => {
    const rows = [
      taskTypeRow(),
      personTypeRow(),
      row({
        id: id(10),
        pageTypeId: PERSON_TYPE,
        slug: "person",
        title: "Ann",
        attributes: { sortOrder: 5, name: "Ann" },
      }),
      row({
        id: id(11),
        pageTypeId: PERSON_TYPE,
        slug: "person",
        title: "Zed",
        attributes: { name: "Zed" },
      }),
      task(1, { owner: id(10) }),
      task(2, { owner: id(11) }),
    ]
    const { ids } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      sorts: [{ by: "owner", dir: "asc" }],
    })
    expect(ids).toEqual([id(2), id(1)])
  })
})

describe("view pipeline — Tier 4 rollup + aggregate", () => {
  test("rollup sort resolves through the relation target", async () => {
    const rows = [
      taskTypeRow(),
      personTypeRow(),
      row({
        id: id(10),
        pageTypeId: PERSON_TYPE,
        slug: "person",
        title: "P10",
        attributes: { name: "beta" },
      }),
      row({
        id: id(11),
        pageTypeId: PERSON_TYPE,
        slug: "person",
        title: "P11",
        attributes: { name: "alpha" },
      }),
      task(1, { owner: id(10) }),
      task(2, { owner: id(11) }),
    ]
    const { ids } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      sorts: [{ by: "ownerName", dir: "asc" }],
    })
    expect(ids).toEqual([id(2), id(1)])
  })

  test("rollup as the SECOND sort key breaks ties left by the first key (#15778)", async () => {
    const rows = [
      taskTypeRow(),
      personTypeRow(),
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
      task(1, { priority: 1, owner: id(10) }, { title: "AAA" }),
      task(2, { priority: 1, owner: id(11) }, { title: "BBB" }),
    ]
    const { ids } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      sorts: [
        { by: "priority", dir: "asc" },
        { by: "ownerSortOrder", dir: "desc" },
        { by: "title", dir: "asc" },
      ],
    })
    expect(ids).toEqual([id(2), id(1)])
  })

  test("aggregate sum sort folds numeric target weights", async () => {
    const rows = [
      taskTypeRow(),
      personTypeRow(),
      row({ id: id(10), pageTypeId: PERSON_TYPE, slug: "person", attributes: { weight: 10 } }),
      row({ id: id(11), pageTypeId: PERSON_TYPE, slug: "person", attributes: { weight: 20 } }),
      row({ id: id(12), pageTypeId: PERSON_TYPE, slug: "person", attributes: { weight: 3 } }),
      task(1, { kids: [id(10), id(11)] }),
      task(2, { kids: [id(12)] }),
      task(3, { kids: [] }),
    ]
    const { ids } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      sorts: [{ by: "kidSum", dir: "asc" }],
    })
    expect(ids).toEqual([id(3), id(2), id(1)])
  })

  test("aggregate min sort keeps 0-valued targets (no native 0-drop)", async () => {
    const rows = [
      taskTypeRow(),
      personTypeRow(),
      row({ id: id(10), pageTypeId: PERSON_TYPE, slug: "person", attributes: { weight: 0 } }),
      row({ id: id(11), pageTypeId: PERSON_TYPE, slug: "person", attributes: { weight: 5 } }),
      task(1, { kids: [id(10), id(11)] }),
      task(2, { kids: [id(11)] }),
    ]
    const { ids } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      sorts: [{ by: "kidMin", dir: "asc" }],
    })
    expect(ids).toEqual([id(1), id(2)])
  })
})

describe("view pipeline — filter residue + count", () => {
  test("isEmpty residue narrows the set", async () => {
    const rows = [taskTypeRow(), task(1, { status: "open" }), task(2, {}), task(3, { status: "" })]
    const { ids, count } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      filters: [{ key: "status", isEmpty: true }],
      sorts: [{ by: "seq", dir: "asc" }],
    })
    expect(ids).toEqual([id(2), id(3)])
    expect(count).toBe(2)
  })

  test("totalCount is the full filtered size, rows are limit-truncated", async () => {
    const rows = [taskTypeRow(), task(1, {}), task(2, {}), task(3, {}), task(4, {})]
    const { ids, count } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      sorts: [{ by: "seq", dir: "asc" }],
      limit: 2,
    })
    expect(ids).toEqual([id(1), id(2)])
    expect(count).toBe(4)
  })

  test("page-type row is excluded from the queried set", async () => {
    const rows = [taskTypeRow(), task(1, {})]
    const { ids, count } = await readIds(rows, {
      pageTypeId: TASK_TYPE,
      sorts: [{ by: "seq", dir: "asc" }],
    })
    expect(ids).toEqual([id(1)])
    expect(count).toBe(1)
  })
})
