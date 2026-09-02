import { isCharacterLocationRow } from "@akasha/temper-items-core/location-character-row"
import {
  ADDON_NAME,
  HOUSE_BANK_BAGS,
  LOC_BANK,
  LOC_COMPANION_PREFIX,
  LOC_CRAFT_BAG,
  LOC_FURNITURE_VAULT,
  LOC_HOUSE_BANK_PREFIX,
  LOC_HOUSE_PREFIX,
  SAVED_VARIABLES_NAME,
} from "../inventory-constants/inventory-constants.module.code.ts"
import { isItemLinkCraftedSafe } from "../inventory-item-data/inventory-item-data.module.code.ts"
import {
  getDatabase,
  getSavedVariables,
  setSavedVarsInstance,
} from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import {
  type LocationData,
  SAVED_VARIABLES_DEFAULTS,
  type SavedVariablesData,
} from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
export function initializeSavedVariables(): SavedVariablesData {
  const defaults: Record<string, unknown> = { ...SAVED_VARIABLES_DEFAULTS }
  const created: unknown = ZO_SavedVars.NewAccountWide(SAVED_VARIABLES_NAME, 1, undefined, defaults)
  const instance = created as SavedVariablesData
  setSavedVarsInstance(instance)

  instance.db.meta.displayName = GetDisplayName()
  instance.db.meta.worldName = GetWorldName()

  return instance
}

export function migrateHouseBankLocationKeys(): undefined {
  const db = getDatabase()
  const keysToMigrate: string[] = []

  for (const [key, location] of Object.entries(db.locations)) {
    if (key === LOC_BANK || key === LOC_CRAFT_BAG || key === LOC_FURNITURE_VAULT) continue
    if (key.startsWith(LOC_COMPANION_PREFIX)) continue
    if (key.startsWith(LOC_HOUSE_BANK_PREFIX)) continue
    if (key.startsWith(LOC_HOUSE_PREFIX)) continue

    let isHouseBank = false
    for (const bagIdStr of Object.keys(location.bags)) {
      const bagId = tonumber(bagIdStr)
      if (bagId === undefined) continue
      for (const houseBag of HOUSE_BANK_BAGS) {
        if (bagId === houseBag) {
          isHouseBank = true
          break
        }
      }
      if (isHouseBank) break
    }

    if (isHouseBank) keysToMigrate.push(key)
  }

  for (const oldKey of keysToMigrate) {
    const newKey = `${LOC_HOUSE_BANK_PREFIX}${oldKey}`
    const loc = db.locations[oldKey]
    if (loc === undefined) continue
    db.locations[newKey] = loc
    delete db.locations[oldKey]
  }
}

export function migrateItemLinkDerivedFields(): undefined {
  const db = getDatabase()
  let migrated = 0

  for (const location of Object.values(db.locations)) {
    for (const bag of Object.values(location.bags)) {
      for (const item of Object.values(bag)) {
        if (item.itemLink === "") continue

        if (item.equipType === undefined) {
          const raw = GetItemLinkEquipType(item.itemLink)
          if (raw !== 0) {
            item.equipType = raw
            migrated++
          }
        }
        if (item.armorType === undefined) {
          const raw = GetItemLinkArmorType(item.itemLink)
          if (raw !== 0) {
            item.armorType = raw
            migrated++
          }
        }
        if (item.weaponType === undefined) {
          const raw = GetItemLinkWeaponType(item.itemLink)
          if (raw !== 0) {
            item.weaponType = raw
            migrated++
          }
        }
        if (item.specializedItemType === undefined) {
          const [, specialized] = GetItemLinkItemType(item.itemLink)
          if (specialized !== 0) {
            item.specializedItemType = specialized
            migrated++
          }
        }

        if (
          item.furnitureCategoryId === undefined &&
          (item.itemType === ITEMTYPE_FURNISHING || item.itemType === ITEMTYPE_FURNISHING_MATERIAL)
        ) {
          const furnitureDataId = GetItemLinkFurnitureDataId(item.itemLink)
          if (furnitureDataId > 0) {
            const [catId, subcatId] = GetFurnitureDataCategoryInfo(furnitureDataId)
            if (catId !== undefined && catId > 0) {
              item.furnitureCategoryId = catId
              migrated++
              if (subcatId !== undefined && subcatId > 0) {
                item.furnitureSubcategoryId = subcatId
              }
              const name = GetFurnitureCategoryName(catId)
              if (name !== "") item.furnitureCategory = name
            }
          }
        }
      }
    }
  }

  if (migrated > 0) {
    d(`[${ADDON_NAME}] Migrated ${migrated} item fields from stored item links`)
  }
}

export function migrateCraftedField(): undefined {
  const db = getDatabase()
  let migrated = 0

  for (const location of Object.values(db.locations)) {
    for (const bag of Object.values(location.bags)) {
      for (const item of Object.values(bag)) {
        if (item.crafted !== undefined) continue
        if (item.itemLink === "") continue

        if (isItemLinkCraftedSafe(item.itemLink, item.itemType)) {
          item.crafted = true
          migrated++
        }
      }
    }
  }

  if (migrated > 0) {
    d(`[${ADDON_NAME}] Backfilled crafted status for ${migrated} item(s)`)
  }
}

export function migrateEmptyLocationKey(): undefined {
  const db = getDatabase()
  if (db.locations[""] === undefined) return
  delete db.locations[""]
  d(`[${ADDON_NAME}] Removed an inventory location saved under an empty key`)
}

export function pruneDeletedCharacters(): undefined {
  const sv = getSavedVariables()
  const db = sv.db

  const numCharacters = GetNumCharacters()
  if (numCharacters <= 0) return

  const activeCharacterIds = new Set<string>()
  for (let i = 1; i <= numCharacters; i++) {
    const [, , , , , , characterId] = GetCharacterInfo(i)
    activeCharacterIds.add(characterId)
  }

  let pruned = 0

  for (const [key, location] of Object.entries(db.locations)) {
    const bagIds: number[] = []
    for (const bagIdStr of Object.keys(location.bags)) {
      const bagId = tonumber(bagIdStr)
      if (bagId === undefined) continue
      bagIds.push(bagId)
    }
    if (!isCharacterLocationRow(bagIds)) continue

    if (!activeCharacterIds.has(key)) {
      delete db.locations[key]
      pruned++
    }
  }

  if (db.currencies?.characters) {
    for (const charId of Object.keys(db.currencies.characters)) {
      if (!activeCharacterIds.has(charId)) {
        delete db.currencies.characters[charId]
        pruned++
      }
    }
  }

  if (sv.craftingLevels) {
    for (const charId of Object.keys(sv.craftingLevels)) {
      if (!activeCharacterIds.has(charId)) {
        delete sv.craftingLevels[charId]
        pruned++
      }
    }
  }

  if (pruned > 0) {
    d(`[${ADDON_NAME}] Pruned ${pruned} deleted character entry/entries from saved variables`)
  }
}

export function ensureLocation(key: string, displayName: string): LocationData {
  const db = getDatabase()
  if (!db.locations[key]) {
    db.locations[key] = {
      bags: {},
      bagSizes: {},
      displayName: displayName,
      lastScanned: 0,
    }
  }
  db.locations[key].displayName = displayName
  if (!db.locations[key].bagSizes) {
    db.locations[key].bagSizes = {}
  }
  return db.locations[key]
}
