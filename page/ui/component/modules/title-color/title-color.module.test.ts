import { expect, test } from "bun:test"
import { color } from "akasha/design/interface/color/color.page-type.ts"
import { black } from "akasha/design/interface/color/pages/black.color.ts"
import { green } from "akasha/design/interface/color/pages/green.color.ts"
import { grey } from "akasha/design/interface/color/pages/grey.color.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { titleColorClass } from "akasha/page/ui/component/modules/title-color/title-color.module.code.ts"

const TINT: PropertyDefinition = {
  id: "workedTint",
  title: "Worked Tint",
  type: "relation",
  colorsTitle: true,
}

const OTHER: PropertyDefinition = { id: "shade", title: "Shade", type: "relation" }

test("a title is drawn in the text color a badge of its color takes", () => {
  const data = { workedTint: namedAs(color.slug, green.slug, null) }
  expect(titleColorClass([OTHER, TINT], data)).toBe("text-green")
})

test("a neutral color draws a title in the text a badge of that neutral takes", () => {
  expect(titleColorClass([TINT], { workedTint: namedAs(color.slug, black.slug, null) })).toBe(
    "text-primary"
  )
  expect(titleColorClass([TINT], { workedTint: namedAs(color.slug, grey.slug, null) })).toBe(
    "text-secondary"
  )
})

test("a page whose property holds no color answers no color", () => {
  expect(titleColorClass([TINT], {})).toBeNull()
  expect(titleColorClass([TINT], { workedTint: null })).toBeNull()
  expect(titleColorClass([TINT], { workedTint: namedAs(color.slug, "vermilion", null) })).toBeNull()
})

test("a page type naming no property to color titles answers no color", () => {
  const data = { shade: namedAs(color.slug, green.slug, null) }
  expect(titleColorClass([OTHER], data)).toBeNull()
})

test("a page not yet read answers no color", () => {
  expect(titleColorClass([TINT], undefined)).toBeNull()
})
