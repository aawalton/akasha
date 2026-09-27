import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import type {
  BrowserRow,
  FixedLocationViewId,
  LocationViewKind,
  LocationViewOption,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-types/inventory-browser-types.module.code.ts"
import { locationTypeOrder } from "akasha/temper/addon/pages/items/modules/inventory-location-order/inventory-location-order.module.code.ts"
import { getDatabase } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { buildItemCentricInventory } from "akasha/temper/items/core/modules/item-centric-inventory/item-centric-inventory.module.code.ts"
import {
  classifyLocation,
  getLocationDisplayName,
  type LocationTypeId,
} from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import { temperLocationView } from "akasha/temper/player/holdings/temper-location-view/temper-location-view.page-type.ts"
import type { TemperLocationView } from "akasha/temper/player/holdings/temper-location-view/temper-location-view.page-type.types.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const FIXED_VIEW_IDS: Record<FixedLocationViewId, true> = {
  all: true,
  allBanks: true,
  allGuildBanks: true,
  allCharacters: true,
  allCompanions: true,
  allEquipped: true,
  allStorage: true,
  everything: true,
  bankOnly: true,
  bankAndCharacters: true,
  bankCurrentCharacter: true,
  bankOtherCharacters: true,
  craftBag: true,
  housingStorage: true,
  allHouses: true,
}

function isFixedLocationViewId(value: string): value is FixedLocationViewId {
  return value in FIXED_VIEW_IDS
}

type ViewRow = Pick<TemperLocationView, "key" | "title" | "displayOrder">

function fixedLocationViews(this: void): readonly (readonly [FixedLocationViewId, string])[] {
  const rows: ViewRow[] = []
  for (const one of $pagesOfType<ViewRow>(temperLocationView)) rows.push(one)
  rows.sort((one, two) => one.displayOrder - two.displayOrder)
  const views: (readonly [FixedLocationViewId, string])[] = []
  for (const one of rows) {
    if (isFixedLocationViewId(one.key)) views.push([one.key, one.title ?? one.key])
  }
  return views
}

let heldViews: readonly (readonly [FixedLocationViewId, string])[] | undefined

function dynamicKindForLocationType(locationType: LocationTypeId): LocationViewKind | undefined {
  switch (locationType) {
    case "character":
      return "character"
    case "companion":
      return "companion"
    case "guild":
      return "guildBank"
    case "housing-storage":
    case "house":
      return "houseBank"
    case "bank":
    case "craftbag":
      return undefined
    default:
      return assertNever(locationType)
  }
}

export function buildBrowserRows(this: void): BrowserRow[] {
  const view = buildItemCentricInventory(getDatabase(), locationTypeOrder())
  const rows: BrowserRow[] = []

  for (const entry of view.values()) {
    const itemLink = entry.item.itemLink

    const weaponType = GetItemLinkWeaponType(itemLink)
    const armorType = GetItemLinkArmorType(itemLink)
    const [itemType, specializedItemType] = GetItemLinkItemType(itemLink)
    const equipType = GetItemLinkEquipType(itemLink)

    const isCompanionItem = GetItemLinkActorCategory(itemLink) === GAMEPLAY_ACTOR_CATEGORY_COMPANION
    const isFurnishing = itemType === ITEMTYPE_FURNISHING

    const furnitureDataId = GetItemLinkFurnitureDataId(itemLink)
    const [furnitureCategoryId, furnitureSubcategoryId] =
      GetFurnitureDataCategoryInfo(furnitureDataId)

    const [hasSet, setName] = GetItemLinkSetInfo(itemLink)

    rows.push({
      itemId: entry.itemId,
      itemLink,
      itemName: zo_strformat("<<1>>", entry.item.itemName),
      quality: entry.item.quality,
      icon: GetItemLinkIcon(itemLink),
      aggregatedQty: entry.aggregatedQty,
      worn: entry.worn,
      wornCompanion: entry.wornCompanion,
      stolen: IsItemLinkStolen(itemLink),
      setName: hasSet ? zo_strformat("<<1>>", setName) : "",
      itemType,
      specializedItemType,
      weaponType,
      armorType,
      equipType,
      furnitureCategoryId: furnitureCategoryId ?? 0,
      furnitureSubcategoryId: furnitureSubcategoryId ?? 0,
      isCompanionItem,
      isFurnishing,
      locations: entry.locations,
    })
  }

  return rows
}

export function collectLocationOptions(this: void): LocationViewOption[] {
  const options: LocationViewOption[] = []

  if (heldViews === undefined) heldViews = fixedLocationViews()
  for (const [fixedId, label] of heldViews) {
    options.push({ label, kind: "fixed", fixedId })
  }

  const db = getDatabase()
  const seen = new Set<string>()

  for (const [locationKey, location] of Object.entries(db.locations)) {
    if (seen.has(locationKey)) continue
    const kind = dynamicKindForLocationType(classifyLocation(locationKey))
    if (kind === undefined) continue
    seen.add(locationKey)
    options.push({
      label: getLocationDisplayName(locationKey, location.displayName),
      kind,
      locationKey,
    })
  }

  return options
}
