import { stripEsoNameSuffix } from "@akasha/temper-build-support/eso-name"
import { parseItemLink } from "@akasha/temper-items-core/item-link-parser"
import { readFirstAccountWide } from "@akasha/temper-saved-variables/account-wide"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { asRecord } from "@akasha/utils-narrow/as-record"
import {
  parseCraftingLevels,
  parseOpenCooldowns,
  parseTransmuteCrystalAmount,
  parseTransmuteCrystalCap,
} from "../inventory-parser-account-state/inventory-parser-account-state.module.code.ts"
import {
  inferCompanionProperties,
  inferPlayerArmorProperties,
} from "../inventory-parser-inference/inventory-parser-inference.module.code.ts"
import type {
  CharacterCurrencies,
  CurrencyBalances,
  InventoryCurrencies,
  InventoryDatabase,
  InventoryItemData,
  InventoryLocationData,
  PlacedFurnishingData,
  PriceSource,
} from "../inventory-types/inventory-types.module.code.ts"

function asNumber(value: unknown): number {
  return typeof value === "number" ? value : 0
}

function parsePriceSource(value: unknown): PriceSource | undefined {
  if (value === "ttc" || value === "none") return value
  return undefined
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : ""
}

const TITLE_CASE_LOWERCASE = new Set([
  "of",
  "the",
  "a",
  "an",
  "and",
  "or",
  "in",
  "on",
  "at",
  "to",
  "for",
  "with",
])

function cleanItemName(name: string): string {
  const stripped = stripEsoNameSuffix(name)
  return stripped.replace(/\S+/g, (word, offset: number) => {
    if (offset > 0 && TITLE_CASE_LOWERCASE.has(word.toLowerCase())) return word.toLowerCase()
    return word.charAt(0).toUpperCase() + word.slice(1)
  })
}

function isItemLinkBound(itemLink: string): boolean {
  return parseItemLink(itemLink)?.bound ?? false
}

function asOptionalNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
}

function asOptionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

export function parseItem(raw: unknown): InventoryItemData | undefined {
  const item = asRecord(raw)
  if (!item) return undefined

  const parsed: InventoryItemData = {
    itemId: asNumber(item.itemId),
    itemName: cleanItemName(asString(item.itemName)),
    itemLink: asString(item.itemLink),
    quality: asNumber(item.quality),
    filterType: asNumber(item.filterType),
    itemType: asNumber(item.itemType),
    traitType: asNumber(item.traitType),
    requiredLevel: asNumber(item.requiredLevel),
    requiredCP: asNumber(item.requiredCP),
    stackCount: asNumber(item.stackCount),
  }

  const specializedItemType = asOptionalNumber(item.specializedItemType)
  if (specializedItemType !== undefined) parsed.specializedItemType = specializedItemType

  const equipType = asOptionalNumber(item.equipType)
  if (equipType !== undefined) parsed.equipType = equipType

  const weaponType = asOptionalNumber(item.weaponType)
  if (weaponType !== undefined) parsed.weaponType = weaponType

  const armorType = asOptionalNumber(item.armorType)
  if (armorType !== undefined) parsed.armorType = armorType

  const setId = asOptionalNumber(item.setId)
  if (setId !== undefined && setId !== 0) parsed.setId = setId

  const furnitureCategory = asOptionalString(item.furnitureCategory)
  if (furnitureCategory !== undefined) parsed.furnitureCategory = furnitureCategory

  const furnitureCategoryId = asOptionalNumber(item.furnitureCategoryId)
  if (furnitureCategoryId !== undefined) parsed.furnitureCategoryId = furnitureCategoryId

  const furnitureSubcategoryId = asOptionalNumber(item.furnitureSubcategoryId)
  if (furnitureSubcategoryId !== undefined) parsed.furnitureSubcategoryId = furnitureSubcategoryId

  inferCompanionProperties(parsed)
  inferPlayerArmorProperties(parsed)

  if (typeof item.stolen === "boolean") parsed.stolen = item.stolen

  if (typeof item.bound === "boolean") parsed.bound = item.bound

  if (typeof item.bopTradeable === "boolean") parsed.bopTradeable = item.bopTradeable

  if (typeof item.questRelevant === "boolean") parsed.questRelevant = item.questRelevant

  if (typeof item.reconstructed === "boolean") parsed.reconstructed = item.reconstructed
  if (typeof item.transmuted === "boolean") parsed.transmuted = item.transmuted
  if (typeof item.locked === "boolean") parsed.locked = item.locked
  if (typeof item.known === "boolean") parsed.known = item.known
  if (typeof item.crafted === "boolean") parsed.crafted = item.crafted
  if (typeof item.isContainer === "boolean") parsed.isContainer = item.isContainer

  const merchantValue = asOptionalNumber(item.merchantValue)
  if (merchantValue !== undefined) parsed.merchantValue = merchantValue

  const saleAvg = asOptionalNumber(item.saleAvg)
  const minPrice = asOptionalNumber(item.minPrice)
  const amountCount = asOptionalNumber(item.amountCount)
  const saleAmountCount = asOptionalNumber(item.saleAmountCount)
  const suggestedPrice = asOptionalNumber(item.suggestedPrice)
  const estimatedValue = asOptionalNumber(item.estimatedValue)

  if (parsed.bound) {
    if (estimatedValue !== undefined) parsed.replacementCost = estimatedValue
  } else {
    if (saleAvg !== undefined) parsed.saleAvg = saleAvg
    if (minPrice !== undefined) parsed.minPrice = minPrice
    if (amountCount !== undefined) parsed.amountCount = amountCount
    if (saleAmountCount !== undefined) parsed.saleAmountCount = saleAmountCount
    if (suggestedPrice !== undefined) parsed.suggestedPrice = suggestedPrice
    if (estimatedValue !== undefined) parsed.estimatedValue = estimatedValue
  }

  return parsed
}

function parsePlacedFurnishing(raw: unknown): PlacedFurnishingData | undefined {
  const f = asRecord(raw)
  if (!f) return undefined

  const parsed: PlacedFurnishingData = {
    itemName: cleanItemName(asString(f.itemName)),
    quality: asNumber(f.quality),
    itemLink: asString(f.itemLink),
    collectibleLink: asString(f.collectibleLink),
  }

  if (parsed.itemLink !== "" && !isItemLinkBound(parsed.itemLink)) {
    const saleAvg = asOptionalNumber(f.saleAvg)
    const minPrice = asOptionalNumber(f.minPrice)
    const amountCount = asOptionalNumber(f.amountCount)
    const saleAmountCount = asOptionalNumber(f.saleAmountCount)
    const suggestedPrice = asOptionalNumber(f.suggestedPrice)
    const estimatedValue = asOptionalNumber(f.estimatedValue)

    if (saleAvg !== undefined) parsed.saleAvg = saleAvg
    if (minPrice !== undefined) parsed.minPrice = minPrice
    if (amountCount !== undefined) parsed.amountCount = amountCount
    if (saleAmountCount !== undefined) parsed.saleAmountCount = saleAmountCount
    if (suggestedPrice !== undefined) parsed.suggestedPrice = suggestedPrice
    if (estimatedValue !== undefined) parsed.estimatedValue = estimatedValue
  }

  return parsed
}

function parseLocation(raw: unknown): InventoryLocationData | undefined {
  const loc = asRecord(raw)
  if (!loc) return undefined

  const bags: Record<number, Record<number, InventoryItemData>> = {}
  const rawBags = asRecord(loc.bags)
  if (rawBags) {
    for (const [bagKey, bagValue] of Object.entries(rawBags)) {
      const bagId = Number(bagKey)
      if (Number.isNaN(bagId)) continue

      const slots: Record<number, InventoryItemData> = {}
      const rawSlots = asRecord(bagValue)
      if (rawSlots) {
        for (const [slotKey, slotValue] of Object.entries(rawSlots)) {
          const slotIndex = Number(slotKey)
          if (Number.isNaN(slotIndex)) continue
          const item = parseItem(slotValue)
          if (item) slots[slotIndex] = item
        }
      }
      bags[bagId] = slots
    }
  }

  let placedFurnishings: Record<string, PlacedFurnishingData> | undefined
  const rawFurnishings = asRecord(loc.placedFurnishings)
  if (rawFurnishings) {
    placedFurnishings = {}
    for (const [furnitureId, furnishingValue] of Object.entries(rawFurnishings)) {
      const furnishing = parsePlacedFurnishing(furnishingValue)
      if (furnishing) placedFurnishings[furnitureId] = furnishing
    }
    if (Object.keys(placedFurnishings).length === 0) placedFurnishings = undefined
  }

  let bagSizes: Record<number, number> | undefined
  const rawBagSizes = asRecord(loc.bagSizes)
  if (rawBagSizes) {
    bagSizes = {}
    for (const [key, value] of Object.entries(rawBagSizes)) {
      const bagId = Number(key)
      if (Number.isNaN(bagId)) continue
      const size = asNumber(value)
      if (size > 0) bagSizes[bagId] = size
    }
    if (Object.keys(bagSizes).length === 0) bagSizes = undefined
  }

  const result: InventoryLocationData = {
    bags,
    displayName: asString(loc.displayName),
    lastScanned: asNumber(loc.lastScanned),
  }
  if (bagSizes) result.bagSizes = bagSizes
  if (placedFurnishings) result.placedFurnishings = placedFurnishings
  return result
}

export function parseInventoryContent(content: string): InventoryDatabase {
  const root = parseLuaSavedVariablesFile(content, "TemperInventory_SavedVariables")

  const defaultTable = asRecord(root.Default)
  if (!defaultTable) throw new Error("Missing Default table in TemperInventory saved variables")

  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide)
    throw new Error("Could not find $AccountWide in TemperInventory saved variables")

  const db = asRecord(accountWide.db)
  if (!db) throw new Error("Missing db field in TemperInventory saved variables")

  const rawMeta = asRecord(db.meta)
  const meta: InventoryDatabase["meta"] = {
    displayName: asString(rawMeta?.displayName),
    worldName: asString(rawMeta?.worldName),
    lastFullScan: asNumber(rawMeta?.lastFullScan),
  }
  const priceSource = parsePriceSource(rawMeta?.priceSource)
  if (priceSource !== undefined) meta.priceSource = priceSource

  const locations: Record<string, InventoryLocationData> = {}
  const rawLocations = asRecord(db.locations)
  if (rawLocations) {
    for (const [locationKey, locationValue] of Object.entries(rawLocations)) {
      const location = parseLocation(locationValue)
      if (location) locations[locationKey] = location
    }
  }

  const currencies = parseCurrencies(db.currencies)

  const openCooldowns = parseOpenCooldowns(accountWide.openCooldowns)
  const craftingLevels = parseCraftingLevels(accountWide.craftingLevels)
  const transmuteCrystalCap = parseTransmuteCrystalCap(accountWide.transmuteCrystalCap)
  const transmuteCrystalAmount = parseTransmuteCrystalAmount(accountWide.transmuteCrystalAmount)

  const result: InventoryDatabase = { locations, meta }
  if (currencies) result.currencies = currencies
  if (openCooldowns) result.openCooldowns = openCooldowns
  if (craftingLevels) result.craftingLevels = craftingLevels
  if (transmuteCrystalCap !== undefined) result.transmuteCrystalCap = transmuteCrystalCap
  if (transmuteCrystalAmount !== undefined) result.transmuteCrystalAmount = transmuteCrystalAmount
  return result
}

function parseCurrencyBalances(raw: unknown): CurrencyBalances | undefined {
  const obj = asRecord(raw)
  if (!obj) return undefined

  const balances: CurrencyBalances = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "number" && value > 0) {
      balances[key] = value
    }
  }
  return Object.keys(balances).length > 0 ? balances : undefined
}

function parseCurrencies(raw: unknown): InventoryCurrencies | undefined {
  const obj = asRecord(raw)
  if (!obj) return undefined

  const characters: Record<string, CharacterCurrencies> = {}
  const rawChars = asRecord(obj.characters)
  if (rawChars) {
    for (const [charId, charValue] of Object.entries(rawChars)) {
      const charObj = asRecord(charValue)
      if (!charObj) continue
      const balances = parseCurrencyBalances(charObj.balances)
      if (balances) {
        characters[charId] = {
          displayName: asString(charObj.displayName),
          lastScanned: asNumber(charObj.lastScanned),
          balances,
        }
      }
    }
  }

  const bank = parseCurrencyBalances(obj.bank)
  const account = parseCurrencyBalances(obj.account)
  const hasCharacters = Object.keys(characters).length > 0

  if (!hasCharacters && !bank && !account) return undefined

  const result: InventoryCurrencies = { characters }
  if (bank) result.bank = bank
  if (account) result.account = account
  return result
}
