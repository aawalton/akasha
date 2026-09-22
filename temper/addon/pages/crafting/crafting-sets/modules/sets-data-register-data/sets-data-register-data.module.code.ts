import {
  asNumber,
  asNumRecord,
  asTyped,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  asNoSetIdSetsElement,
  asNumKeyedNumRecord,
  asNumToNumRecord,
  asSetInfoElement,
  asUnknown,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-data-casts/sets-data-casts.module.code.ts"
import { BLACKLISTED_SET_IDS } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-gen-blacklisted-set-ids/sets-gen-blacklisted-set-ids.module.code.ts"
import { NO_SET_ID_SETS } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-gen-no-set-id-sets/sets-gen-no-set-id-sets.module.code.ts"
import { SET_DATA_PRELOADED } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-gen-set-data-preloaded/sets-gen-set-data-preloaded.module.code.ts"
import { SET_INFO } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-gen-set-info/sets-gen-set-info.module.code.ts"
import { SETS_OF_NEWER_API_VERSION } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-gen-sets-of-newer-api-version/sets-gen-sets-of-newer-api-version.module.code.ts"
import { SPECIAL_BONUS_SETS } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-gen-special-bonus-sets/sets-gen-special-bonus-sets.module.code.ts"
import { ZONE_IDS_OF_NEWER_API_VERSION } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-gen-zone-ids-of-newer-api-version/sets-gen-zone-ids-of-newer-api-version.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/sets-api/sets-api.type-declaration.d.ts"
import {
  SETS_TABLEKEY_SETITEMIDS,
  SETS_TABLEKEY_SETITEMIDS_NO_SETID,
  SETS_TABLEKEY_SETNAMES,
  SETS_TABLEKEY_SETNAMES_NO_SETID,
  SETS_TABLEKEY_SETS_ARMOR_TYPES,
  SETS_TABLEKEY_SETS_EQUIP_TYPES,
  SETS_TABLEKEY_SETS_JEWELRY,
  SETS_TABLEKEY_SETS_WEAPONS_TYPES,
  SETS_TABLEKEY_WAYSHRINENODEID2ZONEID,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

lib.setDataPreloaded = asTyped<SetsApi["setDataPreloaded"]>(SET_DATA_PRELOADED)
lib.zoneIdsOfNewAPIVersionOnly = [...ZONE_IDS_OF_NEWER_API_VERSION]

lib.blacklistedSetIds = asTyped<SetsApi["blacklistedSetIds"]>(BLACKLISTED_SET_IDS)
lib.specialBonusSets = asTyped<SetsApi["specialBonusSets"]>(SPECIAL_BONUS_SETS)
lib.setsOfNewerAPIVersion = [...SETS_OF_NEWER_API_VERSION]
lib.setInfo = asTyped<SetsApi["setInfo"]>(SET_INFO)
lib.noSetIdSets = asTyped<SetsApi["noSetIdSets"]>(NO_SET_ID_SETS)

const isPTSAPIVersionLive = lib.checkIfPTSAPIVersionIsLive()

function removeFutureSetData(this: void): undefined {
  if (!isPTSAPIVersionLive) {
    const setsOfNewerAPIVersion = lib.setsOfNewerAPIVersion
    const setDataPreloaded = lib.setDataPreloaded
    if (setsOfNewerAPIVersion !== undefined && !ZO_IsTableEmpty(setsOfNewerAPIVersion)) {
      const nonSetIds = lib.noSetIdSets
      const setInfo = lib.setInfo
      const nonExistingSetIdsAtCurrentApiVersion = lib.nonExistingSetIdsAtCurrentApiVersion
      const setIdsToSetItemIds = asNumRecord(setDataPreloaded[SETS_TABLEKEY_SETITEMIDS])
      const setIdsNoSetToSetItemIds = asNumRecord(
        setDataPreloaded[SETS_TABLEKEY_SETITEMIDS_NO_SETID]
      )
      const setNamesNoSetToSetItemIds = asNumRecord(
        setDataPreloaded[SETS_TABLEKEY_SETNAMES_NO_SETID]
      )
      const preloadedEquipTypeData = asNumKeyedNumRecord(
        setDataPreloaded[SETS_TABLEKEY_SETS_EQUIP_TYPES]
      )
      const preloadedArmorTypeData = asNumKeyedNumRecord(
        setDataPreloaded[SETS_TABLEKEY_SETS_ARMOR_TYPES]
      )
      const preloadedWeaponTypeData = asNumKeyedNumRecord(
        setDataPreloaded[SETS_TABLEKEY_SETS_WEAPONS_TYPES]
      )
      const preloadedIsJewelryData = asNumRecord(setDataPreloaded[SETS_TABLEKEY_SETS_JEWELRY])
      const setIdsToSetNames = asNumRecord(setDataPreloaded[SETS_TABLEKEY_SETNAMES])
      for (const [, setIdOfNewAPIVersion] of ipairs(setsOfNewerAPIVersion)) {
        if (setIdOfNewAPIVersion !== undefined) {
          if (nonSetIds[setIdOfNewAPIVersion] !== undefined) {
            lib.noSetIdSets[setIdOfNewAPIVersion] = asNoSetIdSetsElement(undefined)
            nonExistingSetIdsAtCurrentApiVersion[setIdOfNewAPIVersion] = true
          }
          if (setInfo[setIdOfNewAPIVersion] !== undefined) {
            lib.setInfo[setIdOfNewAPIVersion] = asSetInfoElement(undefined)
            nonExistingSetIdsAtCurrentApiVersion[setIdOfNewAPIVersion] = true
          }
          if (setIdsToSetItemIds[setIdOfNewAPIVersion] !== undefined) {
            setIdsToSetItemIds[setIdOfNewAPIVersion] = undefined
          }
          if (setIdsNoSetToSetItemIds[setIdOfNewAPIVersion] !== undefined) {
            setIdsNoSetToSetItemIds[setIdOfNewAPIVersion] = undefined
          }
          if (setIdsToSetNames[setIdOfNewAPIVersion] !== undefined) {
            setIdsToSetNames[setIdOfNewAPIVersion] = undefined
          }
          if (setNamesNoSetToSetItemIds[setIdOfNewAPIVersion] !== undefined) {
            setNamesNoSetToSetItemIds[setIdOfNewAPIVersion] = undefined
          }
          for (const [, equipTypeData] of pairs(preloadedEquipTypeData)) {
            if (equipTypeData[setIdOfNewAPIVersion] !== undefined) {
              asTyped<{ [setId: number]: unknown }>(preloadedEquipTypeData)[setIdOfNewAPIVersion] =
                undefined
            }
          }
          for (const [, armorTypeData] of pairs(preloadedArmorTypeData)) {
            if (armorTypeData[setIdOfNewAPIVersion] !== undefined) {
              asTyped<{ [setId: number]: unknown }>(preloadedArmorTypeData)[setIdOfNewAPIVersion] =
                undefined
            }
          }
          for (const [, weaponTypeData] of pairs(preloadedWeaponTypeData)) {
            if (weaponTypeData[setIdOfNewAPIVersion] !== undefined) {
              asTyped<{ [setId: number]: unknown }>(preloadedWeaponTypeData)[setIdOfNewAPIVersion] =
                undefined
            }
          }
          if (preloadedIsJewelryData[setIdOfNewAPIVersion] !== undefined) {
            preloadedIsJewelryData[setIdOfNewAPIVersion] = undefined
          }
        }
      }
    }
    const zoneIdsOfNewAPIVersionOnly = lib.zoneIdsOfNewAPIVersionOnly
    if (
      asUnknown(!zoneIdsOfNewAPIVersionOnly) === undefined &&
      !ZO_IsTableEmpty(zoneIdsOfNewAPIVersionOnly)
    ) {
      const wayshrines2ZoneIds = asNumToNumRecord(
        setDataPreloaded[SETS_TABLEKEY_WAYSHRINENODEID2ZONEID]
      )
      for (const [, zoneIdOfNewAPIVersion] of pairs(zoneIdsOfNewAPIVersionOnly)) {
        if (zoneIdOfNewAPIVersion !== undefined) {
          for (const [wayshrineNodeIndex, zoneId] of pairs(wayshrines2ZoneIds)) {
            if (zoneId === zoneIdOfNewAPIVersion) {
              wayshrines2ZoneIds[wayshrineNodeIndex] = asNumber(undefined)
            }
          }
        }
      }
    }
  }
}
lib.removeFutureSetData = removeFutureSetData
