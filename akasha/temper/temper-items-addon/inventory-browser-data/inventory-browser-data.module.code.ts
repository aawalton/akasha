import { buildItemCentricInventory } from "@akasha/temper-items-core/item-centric-inventory"
import {
  classifyLocation,
  getLocationDisplayName,
} from "@akasha/temper-items-core/location-classify"
import type { LocationTypeId } from "@akasha/temper-items-core/location-type-data"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type {
  BrowserRow,
  FixedLocationViewId,
  LocationViewKind,
  LocationViewOption,
} from "../inventory-browser-types/inventory-browser-types.module.code.ts"
import { getDatabase } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"

const FIXED_LOCATION_VIEWS: readonly (readonly [FixedLocationViewId, string])[] = [
  ["all", "All"],
  ["allBanks", "All Banks"],
  ["allGuildBanks", "All Guild Banks"],
  ["allCharacters", "All Characters"],
  ["allCompanions", "All Companions"],
  ["allEquipped", "All Equipped"],
  ["allStorage", "All Storage"],
  ["everything", "Everything"],
  ["bankOnly", "Bank Only"],
  ["bankAndCharacters", "Bank + Characters"],
  ["bankCurrentCharacter", "Bank + Current Character"],
  ["bankOtherCharacters", "Bank + Other Characters"],
  ["craftBag", "Craft Bag"],
  ["housingStorage", "Housing Storage"],
  ["allHouses", "All Houses"],
]

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
  const view = buildItemCentricInventory(getDatabase())
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

  for (const [fixedId, label] of FIXED_LOCATION_VIEWS) {
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
