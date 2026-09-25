import { expect, test } from "bun:test"
import {
  multiSelectConfigSchema,
  selectConfigSchema,
} from "akasha/page/core/schema/modules/property-config-schemas/property-config-schemas.module.code.ts"

const OPTIONS = [{ id: "proposed", label: "Proposed" }]

test("a select config carries its own options and names no list they are drawn from", () => {
  expect(selectConfigSchema.parse({ options: OPTIONS, optionListRef: "option-list" })).toEqual({
    options: OPTIONS,
  })
})

test("a multi-select config carries its own options and names no list they are drawn from", () => {
  expect(multiSelectConfigSchema.parse({ options: OPTIONS, optionListRef: "option-list" })).toEqual(
    { options: OPTIONS }
  )
})
