import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import {
  type CategoryPageRow,
  placedCategories,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-category-placing/inventory-browser-category-placing.module.code.ts"
import {
  type CategoryNumbers,
  type CategoryTypesRow,
  categoryTypes,
  numberByAddress,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-category-types/inventory-browser-category-types.module.code.ts"
import type {
  CategoryDef,
  SubfilterDef,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-types/inventory-browser-types.module.code.ts"
import { temperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.ts"
import { temperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.ts"
import { temperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.ts"
import { temperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.ts"
import { temperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.ts"
import { temperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.ts"

type CategoryRow = CategoryPageRow & CategoryTypesRow

interface ItemTypeRow {
  readonly slug: string
  readonly esoItemTypeNumber?: number
}

interface SpecializedItemTypeRow {
  readonly slug: string
  readonly esoSpecializedItemTypeNumber?: number
}

interface WeaponTypeRow {
  readonly slug: string
  readonly esoWeaponTypeNumber?: number
}

interface ArmorWeightRow {
  readonly slug: string
  readonly armorType?: number
  readonly esoWeaponTypeNumber?: number
}

interface EquipTypeRow {
  readonly slug: string
  readonly equipType?: number
}

function pageNumbers(this: void): CategoryNumbers {
  const weights = $pagesOfType<ArmorWeightRow>(temperArmorWeight)
  return {
    itemTypes: numberByAddress(
      temperItemType.slug,
      $pagesOfType<ItemTypeRow>(temperItemType),
      (row) => row.esoItemTypeNumber
    ),
    specializedItemTypes: numberByAddress(
      temperSpecializedItemType.slug,
      $pagesOfType<SpecializedItemTypeRow>(temperSpecializedItemType),
      (row) => row.esoSpecializedItemTypeNumber
    ),
    weaponTypes: numberByAddress(
      temperWeaponType.slug,
      $pagesOfType<WeaponTypeRow>(temperWeaponType),
      (row) => row.esoWeaponTypeNumber
    ),
    armorTypes: numberByAddress(temperArmorWeight.slug, weights, (row) => row.armorType),
    armorWeaponTypes: numberByAddress(
      temperArmorWeight.slug,
      weights,
      (row) => row.esoWeaponTypeNumber
    ),
    equipTypes: numberByAddress(
      temperEquipType.slug,
      $pagesOfType<EquipTypeRow>(temperEquipType),
      (row) => row.equipType
    ),
  }
}

interface Matching {
  readonly category: string
  readonly buildTypes: (this: void) => number[]
}

function matchingOf(this: void, row: CategoryRow, numbers: CategoryNumbers): Matching {
  const types = categoryTypes(row, numbers)
  return { category: row.match ?? "", buildTypes: () => [...types] }
}

function browserCategories(this: void): readonly CategoryDef[] {
  const pages = $pagesOfType<CategoryRow>(temperBrowserCategory)
  const numbers = pageNumbers()
  const matchingBySlug: Record<string, Matching> = {}
  for (const page of pages) matchingBySlug[page.slug] = matchingOf(page, numbers)
  const defs: CategoryDef[] = []
  for (const placed of placedCategories(pages)) {
    const own = matchingBySlug[placed.slug]
    if (own === undefined) continue
    const subfilters: SubfilterDef[] = []
    for (const sub of placed.subfilters) {
      const matching = matchingBySlug[sub.slug]
      if (matching === undefined) continue
      subfilters.push({
        label: sub.label,
        category: matching.category,
        buildTypes: matching.buildTypes,
      })
    }
    defs.push({
      label: placed.label,
      category: own.category,
      buildTypes: own.buildTypes,
      subfilters,
    })
  }
  return defs
}

export const BROWSER_CATEGORIES: readonly CategoryDef[] = browserCategories()
