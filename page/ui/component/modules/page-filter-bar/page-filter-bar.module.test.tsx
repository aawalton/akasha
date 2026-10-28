import { expect, test } from "bun:test"
import type { ViewFilter } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import type { PageFilterDimension } from "akasha/page/core/view/modules/generate-filter-dimensions/generate-filter-dimensions.module.code.ts"
import {
  filterStated,
  shownFilterGroups,
} from "akasha/page/ui/component/modules/page-filter-bar/page-filter-bar.module.code.tsx"

const DIMENSIONS: readonly PageFilterDimension[] = [
  {
    id: "progressedAt",
    label: "Progressed At",
    type: "instant",
    operators: [
      { value: "lt", label: "Is before" },
      { value: "lt_or_empty", label: "Is before or empty" },
    ],
  },
  {
    id: "withinCollections",
    label: "Within Collections",
    type: "text",
    operators: [{ value: "equals", label: "Equals" }],
  },
]

const STATED: readonly ViewFilter[] = [
  {
    propertyId: "withinCollections.collection",
    operator: "equals",
    value: "anime-top-100",
  },
  { propertyId: "progressedAt", operator: "lt_or_empty", value: { sentinel: "today" } },
]

test("every filter a view states is a group, though none was opened by hand", () => {
  const groups = shownFilterGroups([], STATED, DIMENSIONS)
  expect(groups.map((one) => one.id)).toEqual(["withinCollections.collection", "progressedAt"])
})

test("a filter reaching through a property is labelled by that property and the field", () => {
  const [within] = shownFilterGroups([], STATED, DIMENSIONS)
  expect(within?.label).toBe("Within Collections › Collection")
  expect(within?.dimension).toBeUndefined()
})

test("a filter its dimension takes is drawn with that dimension's control", () => {
  const groups = shownFilterGroups([], STATED, DIMENSIONS)
  expect(groups[1]?.dimension?.id).toBe("progressedAt")
})

test("a filter no control takes is stated in words", () => {
  const [within, progressed] = STATED
  if (within === undefined || progressed === undefined) throw new Error("no filter stated")
  expect(filterStated(within, DIMENSIONS)).toBe("Equals anime-top-100")
  expect(filterStated(progressed, DIMENSIONS)).toBe("Is before or empty today")
})

test("a dimension opened by hand with no filter yet is a group", () => {
  const groups = shownFilterGroups(["progressedAt"], [], DIMENSIONS)
  expect(groups.map((one) => one.id)).toEqual(["progressedAt"])
})
