import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import {
  asPropertyType,
  getAccessor,
  multiSelectAlpha,
  multiSelectManual,
  row,
  selectAlpha,
  selectManual,
  sortBy,
  type TestRow,
  UNIVERSAL_DEFS,
} from "./_sort-accessors-test-helpers"
import { generateSortAccessors } from "./sort-accessors"

describe("generateSortAccessors — no hardcoded built-ins", () => {
  test("empty properties yields empty accessor map", () => {
    const accessors = generateSortAccessors([])
    expect(Object.keys(accessors)).toEqual([])
  })

  test("passing only universal column defs installs accessors for each universal", () => {
    const accessors = generateSortAccessors(UNIVERSAL_DEFS)
    expect(Object.keys(accessors).sort()).toEqual(
      [
        "completedAt",
        "icon",
        "id",
        "pageTypeId",
        "seq",
        "title",
        "userId",
      ].sort()
    )
  })

  test("title accessor delegates to textOps.getSortValue", () => {
    const accessors = generateSortAccessors(UNIVERSAL_DEFS)
    expect(getAccessor(accessors, "title")(row("1", { title: "Hello" }))).toBe("Hello")
    expect(getAccessor(accessors, "title")(row("2", { title: 42 }))).toBe("42")
    expect(getAccessor(accessors, "title")(row("3", {}))).toBeNull()
  })

  test("completedAt accessor delegates to instantOps.getSortValue", () => {
    const accessors = generateSortAccessors(UNIVERSAL_DEFS)
    expect(getAccessor(accessors, "completedAt")(row("1", { completedAt: 1234 }))).toBe(1234)
    expect(
      getAccessor(accessors, "completedAt")(row("2", { completedAt: "2026-04-10T15:30:00.000Z" }))
    ).toBe(Date.parse("2026-04-10T15:30:00.000Z"))
    expect(
      getAccessor(accessors, "completedAt")(row("3", { completedAt: "not-an-iso" }))
    ).toBeNull()
    expect(getAccessor(accessors, "completedAt")(row("4", {}))).toBeNull()
  })

  test("seq is sortable via numberOps", () => {
    const accessors = generateSortAccessors(UNIVERSAL_DEFS)
    expect(getAccessor(accessors, "seq")(row("2", { seq: 42 }))).toBe(42)
  })
})

describe("generateSortAccessors — universal columns sortability", () => {
  const accessors = generateSortAccessors(UNIVERSAL_DEFS)

  test("all 7 universals have an accessor installed", () => {
    for (const id of [
      "id",
      "completedAt",
      "pageTypeId",
      "userId",
      "seq",
      "icon",
      "title",
    ]) {
      expect(typeof accessors[id]).toBe("function")
    }
  })

  test("userId returns values per handler", () => {
    expect(getAccessor(accessors, "userId")(row("2", { userId: "user-42" }))).toBe("user-42")
  })
})

describe("generateSortAccessors — select alpha sort", () => {
  test("orders rows by option label, not id", () => {
    const rows: TestRow[] = [
      row("1", { color: "r" }),
      row("2", { color: "g" }),
      row("3", { color: "b" }),
    ]
    const accessors = generateSortAccessors([selectAlpha])
    const sorted = sortBy(rows, getAccessor(accessors, "color"))
    expect(sorted.map((r) => r._id)).toEqual(["3", "2", "1"])
  })

  test("null/undefined values sort to the end", () => {
    const rows: TestRow[] = [
      row("1", { color: "r" }),
      row("2", { color: null }),
      row("3", { color: "b" }),
    ]
    const accessors = generateSortAccessors([selectAlpha])
    const sorted = sortBy(rows, getAccessor(accessors, "color"))
    expect(sorted.map((r) => r._id)).toEqual(["3", "1", "2"])
  })
})

describe("generateSortAccessors — select manual sort", () => {
  test("orders rows by option-defined order, not by id or label", () => {
    const rows: TestRow[] = [
      row("1", { color: "b" }),
      row("2", { color: "r" }),
      row("3", { color: "g" }),
    ]
    const accessors = generateSortAccessors([selectManual])
    const sorted = sortBy(rows, getAccessor(accessors, "color"))
    expect(sorted.map((r) => r._id)).toEqual(["2", "3", "1"])
  })

  test("unknown option ids sort to the end", () => {
    const rows: TestRow[] = [
      row("1", { color: "g" }),
      row("2", { color: "unknown" }),
      row("3", { color: "r" }),
    ]
    const accessors = generateSortAccessors([selectManual])
    const sorted = sortBy(rows, getAccessor(accessors, "color"))
    expect(sorted.map((r) => r._id)).toEqual(["3", "1", "2"])
  })
})

describe("generateSortAccessors — multi-select manual sort", () => {
  test("orders rows by minimum option index across selected ids", () => {
    const rows: TestRow[] = [
      row("1", { tags: ["p2", "p3"] }),
      row("2", { tags: ["p1"] }),
      row("3", { tags: ["p3"] }),
      row("4", { tags: ["p1", "p3"] }),
    ]
    const accessors = generateSortAccessors([multiSelectManual])
    const sorted = sortBy(rows, getAccessor(accessors, "tags"))
    expect(sorted.map((r) => r._id)).toEqual(["2", "4", "1", "3"])
  })

  test("empty arrays and null values sort to the end", () => {
    const rows: TestRow[] = [
      row("1", { tags: ["p2"] }),
      row("2", { tags: [] }),
      row("3", { tags: null }),
      row("4", { tags: ["p1"] }),
    ]
    const accessors = generateSortAccessors([multiSelectManual])
    const sorted = sortBy(rows, getAccessor(accessors, "tags"))
    expect(sorted.slice(0, 2).map((r) => r._id)).toEqual(["4", "1"])
    expect(
      sorted
        .slice(2)
        .map((r) => r._id)
        .sort()
    ).toEqual(["2", "3"])
  })
})

describe("generateSortAccessors — multi-select alpha sort", () => {
  test("orders rows by sorted joined labels", () => {
    const rows: TestRow[] = [
      row("1", { tags: ["p3"] }),
      row("2", { tags: ["p1", "p2"] }),
      row("3", { tags: ["p2"] }),
    ]
    const accessors = generateSortAccessors([multiSelectAlpha])
    const sorted = sortBy(rows, getAccessor(accessors, "tags"))
    expect(sorted.map((r) => r._id)).toEqual(["2", "3", "1"])
  })
})

describe("generateSortAccessors — composition with multiple properties", () => {
  test("each property gets its own accessor; last write wins on id collision", () => {
    const accessors = generateSortAccessors([selectAlpha, selectManual, multiSelectManual])
    expect(typeof accessors.color).toBe("function")
    const r1 = row("1", { color: "r" })
    expect(getAccessor(accessors, "color")(r1)).toBe(0)
  })
})

describe("generateSortAccessors — missing-ops guard", () => {
  test("property whose type has no registered handler is skipped", () => {
    const bogus: PropertyDefinition = {
      id: "bogus",
      title: "Bogus",
      type: asPropertyType("not-a-real-type"),
      config: {},
    }
    const accessors = generateSortAccessors([bogus])
    expect(accessors.bogus).toBeUndefined()
  })

  test("valid properties coexist with missing-ops ones", () => {
    const bogus: PropertyDefinition = {
      id: "bogus",
      title: "Bogus",
      type: asPropertyType("not-a-real-type"),
      config: {},
    }
    const accessors = generateSortAccessors([selectAlpha, bogus])
    expect(typeof accessors.color).toBe("function")
    expect(accessors.bogus).toBeUndefined()
  })
})
