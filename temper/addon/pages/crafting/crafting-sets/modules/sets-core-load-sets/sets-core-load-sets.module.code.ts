import { asNumberArray } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  asLibSlots,
  asNumKeyTable,
  asSetIdBoolMap,
  asSetIdNumberMap,
  asSetIdToStrRecord,
  asTypeToSetIdBoolMap,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import {
  asSetItemCollectionZoneMapping,
  asTypeToSetIdNumberMap,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-core-casts-tables/sets-core-casts-tables.module.code.ts"
import {
  checkSetTypeAndUpdateLibTablesAndCounters,
  type LoadSetsState,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-core-load-sets-checktype/sets-core-load-sets-checktype.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import {
  SETS_SET_ITEMID_TABLE_VALUE_OK,
  SETS_TABLEKEY_SET_ITEM_COLLECTIONS_ZONE_MAPPING,
  SETS_TABLEKEY_SET_PROCS_ALLOWED_IN_PVP,
  SETS_TABLEKEY_SETS_ARMOR_TYPES,
  SETS_TABLEKEY_SETS_EQUIP_TYPES,
  SETS_TABLEKEY_SETS_JEWELRY,
  SETS_TABLEKEY_SETS_WEAPONS_TYPES,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const allowedDropMechanics = lib.allowedDropMechanics

function loadSets(this: void): undefined {
  if (lib.setsScanning) {
    return
  }
  lib.setsScanning = true

  const libDyn = asLibSlots(lib)
  const counterSuffix = lib.counterSuffix
  const preloaded = lib.setDataPreloaded
  const setInfo = lib.setInfo
  const noSetIdSets = lib.noSetIdSets

  const state: LoadSetsState = {
    dropZones: {},
    setId2ZoneIds: {},
    zoneId2SetIds: {},
    dropLocationNames: {},
    setId2DropLocations: {},
    dropLocation2SetIds: {},
    dropLocationNamesAdded: {},
    preloadedSetsWithProcsAllowedInPvP: {},
  }

  lib.perfectedSet2NonPerfectedSet = {}
  lib.nonPerfectedSet2PerfectedSet = {}
  lib.perfectedSets = {}
  lib.nonPerfectedSets = {}
  lib.perfectedSetsInfo = {}

  lib.setTypeToSetIdsForSetTypeTable = {}
  const setTypeToLibraryInternalVariableNames = lib.setTypeToLibraryInternalVariableNames
  if (setTypeToLibraryInternalVariableNames === undefined) {
    return
  }
  for (const [, setsSetTypeVariableData] of pairs(setTypeToLibraryInternalVariableNames)) {
    if (setsSetTypeVariableData !== undefined) {
      const setsSetTypeTableVariable = setsSetTypeVariableData["tableName"]
      const setsSetTypeCounterVariable = setsSetTypeTableVariable + counterSuffix
      if (setsSetTypeTableVariable !== undefined) {
        libDyn[setsSetTypeTableVariable] = {}
      }
      if (setsSetTypeCounterVariable !== undefined) {
        libDyn[setsSetTypeCounterVariable] = 0
      }
    }
  }

  lib.setIds = {}
  preloaded[SETS_TABLEKEY_SET_PROCS_ALLOWED_IN_PVP] = state.preloadedSetsWithProcsAllowedInPvP

  checkSetTypeAndUpdateLibTablesAndCounters(asSetIdToStrRecord(setInfo), state)
  if (noSetIdSets !== undefined && !ZO_IsTableEmpty(noSetIdSets)) {
    checkSetTypeAndUpdateLibTablesAndCounters(asSetIdToStrRecord(noSetIdSets), state)
  }

  for (const [setsSetType, setsSetTypeVariableData] of pairs(
    setTypeToLibraryInternalVariableNames
  )) {
    if (setsSetTypeVariableData !== undefined) {
      const setsSetTypeTableVariable = setsSetTypeVariableData["tableName"]
      if (setsSetTypeTableVariable !== undefined) {
        asNumKeyTable(lib.setTypeToSetIdsForSetTypeTable)[setsSetType] =
          libDyn[setsSetTypeTableVariable]
      }
    }
  }

  buildEquipArmorWeaponJewelryTables(state)
  buildSetItemCollectionTables()

  lib.dropZones = state.dropZones
  lib.setId2DropZones = state.setId2ZoneIds
  lib.dropZone2SetIds = state.zoneId2SetIds
  lib.allowedDropMechanics = allowedDropMechanics
  lib.dropLocationNames = state.dropLocationNames
  lib.dropLocationNames2SetIds = state.dropLocation2SetIds
  lib.setId2DropLocationNames = state.setId2DropLocations

  lib.setsScanning = false
  lib.setsLoaded = true
}
lib.LoadSets = loadSets

function buildEquipArmorWeaponJewelryTables(this: void, _state: LoadSetsState): undefined {
  const preloaded = lib.setDataPreloaded
  const setIds = lib.setIds

  const preloadedEquipTypeData = asTypeToSetIdNumberMap(preloaded[SETS_TABLEKEY_SETS_EQUIP_TYPES])
  lib.equipTypesSets = {}
  for (const [equipType, setsDataOfEquipType] of pairs(preloadedEquipTypeData)) {
    const equipTypesSets = asTypeToSetIdBoolMap(lib.equipTypesSets)
    equipTypesSets[equipType] = equipTypesSets[equipType] ?? {}
    for (const [setId, isSetIdInEquipType] of pairs(setsDataOfEquipType)) {
      if (setIds[setId] !== undefined && isSetIdInEquipType === SETS_SET_ITEMID_TABLE_VALUE_OK) {
        const target = asSetIdBoolMap(equipTypesSets[equipType])
        target[setId] = true
      }
    }
  }

  const preloadedArmorTypeData = asTypeToSetIdNumberMap(preloaded[SETS_TABLEKEY_SETS_ARMOR_TYPES])
  lib.armorSets = {}
  lib.armorTypesSets = {}
  for (const [armorType, setsDataOfArmorType] of pairs(preloadedArmorTypeData)) {
    const armorTypesSets = asTypeToSetIdBoolMap(lib.armorTypesSets)
    const armorSets = asSetIdBoolMap(lib.armorSets)
    armorTypesSets[armorType] = armorTypesSets[armorType] ?? {}
    for (const [setId, isSetIdInArmorType] of pairs(setsDataOfArmorType)) {
      armorSets[setId] = true
      if (setIds[setId] !== undefined && isSetIdInArmorType === SETS_SET_ITEMID_TABLE_VALUE_OK) {
        const target = asSetIdBoolMap(armorTypesSets[armorType])
        target[setId] = true
      }
    }
  }

  const preloadedWeaponTypeData = asTypeToSetIdNumberMap(
    preloaded[SETS_TABLEKEY_SETS_WEAPONS_TYPES]
  )
  lib.weaponSets = {}
  lib.weaponTypesSets = {}
  for (const [weaponType, setsDataOfWeaponType] of pairs(preloadedWeaponTypeData)) {
    const weaponTypesSets = asTypeToSetIdBoolMap(lib.weaponTypesSets)
    const weaponSets = asSetIdBoolMap(lib.weaponSets)
    weaponTypesSets[weaponType] = weaponTypesSets[weaponType] ?? {}
    for (const [setId, isSetIdInWeaponType] of pairs(setsDataOfWeaponType)) {
      weaponSets[setId] = true
      if (setIds[setId] !== undefined && isSetIdInWeaponType === SETS_SET_ITEMID_TABLE_VALUE_OK) {
        const target = asSetIdBoolMap(weaponTypesSets[weaponType])
        target[setId] = true
      }
    }
  }

  const preloadedIsJewelryData = asSetIdNumberMap(preloaded[SETS_TABLEKEY_SETS_JEWELRY])
  lib.jewelrySets = {}
  for (const [setId, isSetIdJewelry] of pairs(preloadedIsJewelryData)) {
    const weaponSets = asSetIdBoolMap(lib.weaponSets)
    const jewelrySets = asSetIdBoolMap(lib.jewelrySets)
    weaponSets[setId] = true
    if (setIds[setId] !== undefined && isSetIdJewelry === SETS_SET_ITEMID_TABLE_VALUE_OK) {
      jewelrySets[setId] = true
    }
  }
}

function buildSetItemCollectionTables(this: void): undefined {
  const preloaded = lib.setDataPreloaded
  const preloadedSetItemCollectionMappingToZone = asSetItemCollectionZoneMapping(
    preloaded[SETS_TABLEKEY_SET_ITEM_COLLECTIONS_ZONE_MAPPING]
  )
  lib.setItemCollectionZoneId2Category = {}
  lib.setItemCollectionCategory2ZoneId = {}
  lib.setItemCollectionParentCategories = {}
  lib.setItemCollectionCategories = {}
  for (const [, category2ZoneData] of ipairs(preloadedSetItemCollectionMappingToZone)) {
    const parentCategoryId = category2ZoneData.parentCategory
    const categoryId = category2ZoneData.category
    if (parentCategoryId !== undefined) {
      lib.setItemCollectionParentCategories[parentCategoryId] =
        lib.setItemCollectionParentCategories[parentCategoryId] ?? {}
      const parentCats = asNumKeyTable(lib.setItemCollectionParentCategories[parentCategoryId])
      parentCats[categoryId] = category2ZoneData
    }
    lib.setItemCollectionCategories[categoryId] = category2ZoneData
    if (category2ZoneData.zoneIds !== undefined) {
      lib.setItemCollectionCategory2ZoneId[categoryId] =
        lib.setItemCollectionCategory2ZoneId[categoryId] ?? []
      for (const [, zoneId] of ipairs(category2ZoneData.zoneIds)) {
        lib.setItemCollectionZoneId2Category[zoneId] =
          lib.setItemCollectionZoneId2Category[zoneId] ?? []
        asNumberArray(lib.setItemCollectionZoneId2Category[zoneId]).push(categoryId)
        asNumberArray(lib.setItemCollectionCategory2ZoneId[categoryId]).push(zoneId)
      }
    }
  }
}
