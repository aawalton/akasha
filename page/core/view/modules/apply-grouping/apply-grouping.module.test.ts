import { expect, test } from "bun:test"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { ReadonlyJSONValue } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { getPageGroupDefinition } from "akasha/page/core/view/modules/apply-grouping/apply-grouping.module.code.ts"
import {
  effectiveGroupable,
  GROUP_NONE_KEY,
} from "akasha/page/core/view/modules/apply-grouping-shared/apply-grouping-shared.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

const TARGET = "flower"
const ROSE = namedAs(TARGET, "rose", null)
const TULIP = namedAs(TARGET, "tulip", null)

const BEDS: PropertyDefinition = {
  id: "beds",
  title: "Beds",
  type: "text",
  fields: [
    { id: "bloom", title: "Bloom", type: "relation", config: { targetPageTypeSlug: TARGET } },
  ],
}

const RESOLVER = {
  resolve: (named: string) => (named === TULIP ? { id: "tulip-id", title: "Red Tulip" } : null),
}

function row(beds: ReadonlyJSONValue) {
  return { _id: "garden", beds }
}

test("a property holding records with a relation field is groupable", () => {
  expect(effectiveGroupable(BEDS)).toBe(true)
  expect(effectiveGroupable({ id: "note", title: "Note", type: "text" })).toBe(false)
})

test("a page is keyed under each page its records name, once each", () => {
  const definition = getPageGroupDefinition("beds", [BEDS], RESOLVER)
  const keys = definition?.getKeys?.(row([{ bloom: ROSE }, { bloom: TULIP }, { bloom: ROSE }]))
  expect(keys).toEqual([ROSE, TULIP])
})

test("a page whose records name no page is keyed under no value", () => {
  const definition = getPageGroupDefinition("beds", [BEDS], RESOLVER)
  expect(definition?.getKeys?.(row([]))).toEqual([GROUP_NONE_KEY])
  expect(definition?.getKeys?.(row(null))).toEqual([GROUP_NONE_KEY])
  expect(definition?.getKeys?.(row([{ other: "x" }]))).toEqual([GROUP_NONE_KEY])
})

test("a group is headed by the title of the page its key names", () => {
  const definition = getPageGroupDefinition("beds", [BEDS], RESOLVER)
  expect(definition?.getLabel(TULIP)).toBe("Red Tulip")
  expect(definition?.getLabel(GROUP_NONE_KEY)).toBe("No Value")
})
