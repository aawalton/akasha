import { LOC_HOUSE_PREFIX } from "../inventory-constants/inventory-constants.module.code.ts"
import { lookupTtcPricing } from "../inventory-item-data/inventory-item-data.module.code.ts"
import { getHouseFurnishingsLocationKey } from "../inventory-location-keys/inventory-location-keys.module.code.ts"
import { ensureLocation } from "../inventory-saved-variables/inventory-saved-variables.module.code.ts"
import { getDatabase } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { PlacedFurnishingData } from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
export function extractFurnishingData(furnitureId: Id64): PlacedFurnishingData | undefined {
  const [itemName] = GetPlacedHousingFurnitureInfo(furnitureId)
  if (itemName === "") return undefined

  const [itemLink, collectibleLink] = GetPlacedFurnitureLink(furnitureId, LINK_STYLE_BRACKETS)
  const quality = GetPlacedHousingFurnitureDisplayQuality(furnitureId)

  const data: PlacedFurnishingData = {
    itemName: zo_strformat("<<1>>", itemName),
    quality: quality,
    itemLink: itemLink ?? "",
    collectibleLink: collectibleLink ?? "",
  }

  if (itemLink !== "") {
    const pricing = lookupTtcPricing(itemLink)
    if (pricing.saleAvg !== undefined) data.saleAvg = pricing.saleAvg
    if (pricing.minPrice !== undefined) data.minPrice = pricing.minPrice
    if (pricing.amountCount !== undefined) data.amountCount = pricing.amountCount
    if (pricing.saleAmountCount !== undefined) data.saleAmountCount = pricing.saleAmountCount
    if (pricing.suggestedPrice !== undefined) data.suggestedPrice = pricing.suggestedPrice
    if (pricing.estimatedValue !== undefined) data.estimatedValue = pricing.estimatedValue
  }

  return data
}

export function scanPlacedFurnishings(): undefined {
  const houseKey = getHouseFurnishingsLocationKey()
  if (houseKey === undefined) return

  const displayName = houseKey.substring(LOC_HOUSE_PREFIX.length)
  const location = ensureLocation(houseKey, displayName)

  location.placedFurnishings = {}

  let furnitureId = GetNextPlacedHousingFurnitureId(undefined)
  while (furnitureId !== undefined) {
    const key = Id64ToString(furnitureId)
    const data = extractFurnishingData(furnitureId)
    if (data && key !== "" && key !== "0") {
      location.placedFurnishings[key] = data
    }
    furnitureId = GetNextPlacedHousingFurnitureId(furnitureId)
  }

  location.lastScanned = GetTimeStamp()
}

export function addPlacedFurnishing(furnitureId: Id64): undefined {
  const houseKey = getHouseFurnishingsLocationKey()
  if (houseKey === undefined) return

  const db = getDatabase()
  const location = db.locations[houseKey]
  if (!location) return

  if (!location.placedFurnishings) {
    location.placedFurnishings = {}
  }

  const key = Id64ToString(furnitureId)
  const data = extractFurnishingData(furnitureId)
  if (data && key !== "" && key !== "0") {
    location.placedFurnishings[key] = data
  }
}

export function removePlacedFurnishing(furnitureId: Id64): undefined {
  const houseKey = getHouseFurnishingsLocationKey()
  if (houseKey === undefined) return

  const db = getDatabase()
  const location = db.locations[houseKey]
  if (!location?.placedFurnishings) return

  const key = Id64ToString(furnitureId)
  delete location.placedFurnishings[key]
}
