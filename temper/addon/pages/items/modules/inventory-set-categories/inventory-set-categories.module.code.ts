import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"
import { temperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.ts"
import type { TemperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.types.ts"

type CategoryRow = Pick<TemperSetCategory, "slug" | "key">

type SetRow = Pick<TemperSet, "esoSetId" | "category">

function keysByAddress(this: void): { [address: string]: string | undefined } {
  const found: { [address: string]: string | undefined } = {}
  for (const one of $pagesOfType<CategoryRow>(temperSetCategory)) {
    found[`${temperSetCategory.slug}/${one.slug}`] = one.key
  }
  return found
}

function categoriesBySet(this: void): { [esoSetId: number]: string | undefined } {
  const keys = keysByAddress()
  const found: { [esoSetId: number]: string | undefined } = {}
  for (const one of $pagesOfType<SetRow>(temperSet)) {
    found[one.esoSetId] = keys[one.category]
  }
  return found
}

let held: { [esoSetId: number]: string | undefined } | undefined

export function setCategoryOf(esoSetId: number): string | undefined {
  if (held === undefined) held = categoriesBySet()
  return held[esoSetId]
}
