import { expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { badgeVariantForColor } from "akasha/design/interface/badge/modules/color-badge-variant/color-badge-variant.module.code.ts"
import { color } from "akasha/design/interface/color/color.page-type.ts"
import { black } from "akasha/design/interface/color/pages/black.color.ts"
import { green } from "akasha/design/interface/color/pages/green.color.ts"
import { grey } from "akasha/design/interface/color/pages/grey.color.ts"
import { slate } from "akasha/design/interface/color/pages/slate.color.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { slug } from "akasha/page/properties/slug.text-property.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const SHADOW = shadowAt(rootOf(import.meta.dir))

function colorSlugs(): readonly string[] {
  const found: string[] = []
  for (const listed of SHADOW.index.everyOfType(color.slug)) {
    const value = SHADOW.pageOf(listed.path)
    const named = value === null ? null : textAt(value, slug.propertySlug)
    if (named !== null) found.push(named)
  }
  return found
}

function namesNoVariant(named: string): boolean {
  const variant = badgeVariantForColor(namedAs(color.slug, named, null))
  return variant === null || variant === undefined
}

test("every color page names a badge variant", () => {
  const slugs = colorSlugs()
  expect(slugs.length).toBeGreaterThan(0)
  expect(slugs.filter(namesNoVariant)).toEqual([])
})

test("a color named by its slug alone names what its address names", () => {
  expect(badgeVariantForColor(green.slug)).toBe("green")
  expect(badgeVariantForColor(namedAs(color.slug, green.slug, null))).toBe("green")
})

test("a neutral names one of the badge's layered variants", () => {
  expect(badgeVariantForColor(namedAs(color.slug, black.slug, null))).toBe("surface")
  expect(badgeVariantForColor(namedAs(color.slug, slate.slug, null))).toBe("elevation")
  expect(badgeVariantForColor(namedAs(color.slug, grey.slug, null))).toBe("elevation-muted")
})

test("a color page nothing here names answers nothing rather than throwing", () => {
  expect(badgeVariantForColor(namedAs(color.slug, "vermilion", null))).toBeNull()
})

test("an address under another page type names no color", () => {
  expect(badgeVariantForColor(namedAs(pageType.slug, green.slug, null))).toBeNull()
})

test("no color at all names no variant", () => {
  expect(badgeVariantForColor(null)).toBeNull()
  expect(badgeVariantForColor(undefined)).toBeNull()
  expect(badgeVariantForColor("")).toBeNull()
})
