import {
  asNumber,
  asPresent,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  asSetNamesTable,
  asSetNamesTableOpt,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-debug-casts/sets-debug-casts.module.code.ts"
import { getAllSetItemIds } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-debug-debug-helpers/sets-debug-debug-helpers.module.code.ts"
import {
  clientLang,
  DEBUG_HOLDER,
  DEBUG_OUTPUT_START_LINE,
  fallbackLang,
  libPrefix,
  PLEASE_RELOAD_UI,
  SCAN_STATE,
  storedInSVFileLibSetsInTable,
  UNKNOWN_NAME,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-debug-debug-state/sets-debug-debug-state.module.code.ts"
import { showSetCountsScanned } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-debug-scan-report/sets-debug-scan-report.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import {
  LIBSETS_SET_ITEMID_TABLE_VALUE_OK,
  LIBSETS_TABLEKEY_SETNAMES,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const tsort = table.sort
const zocstrfor = ZO_CachedStrFormat
const buildItemLink = lib.buildItemLink
const isSetByItemId = lib.IsSetByItemId

const UPPER_CASE_FIRST_FORMATTER = "<<C:1>>"

function debugGetAllSetNames(this: void, noReloadInfo?: boolean): undefined {
  d(DEBUG_OUTPUT_START_LINE + libPrefix + "GetAllSetNames, language: " + tostring(clientLang))
  const noReload = noReloadInfo ?? false
  let svLoadedAlready = false
  let setNamesAdded = 0

  let setWasChecked = false
  const setIdsTable: number[] = []
  const setNamesOfLangTable: { [setId: number]: string } = {}
  let maxSetIdChecked = 0

  const isNonOfficialLanguage = lib.nonOfficialLanguages[clientLang] ?? false

  const allSetItemIds = getAllSetItemIds()
  if (allSetItemIds !== undefined) {
    for (const [setIdToCheck, setsItemIds] of pairs(allSetItemIds)) {
      setWasChecked = false
      if (setsItemIds !== undefined) {
        for (const [itemIdToCheck] of pairs(setsItemIds)) {
          if (!setWasChecked && itemIdToCheck !== undefined) {
            const [isSet, setNameRaw, setId] = isSetByItemId(asNumber(itemIdToCheck))
            if (isSet && setId === setIdToCheck) {
              setWasChecked = true

              let setName: string
              if (isNonOfficialLanguage === true) {
                const preloadedSetNames = asSetNamesTable(
                  lib.setDataPreloaded[LIBSETS_TABLEKEY_SETNAMES]
                )
                const entry = preloadedSetNames[asNumber(setId)]
                setName =
                  (entry !== undefined ? entry[clientLang] : undefined) ??
                  (entry !== undefined ? entry[fallbackLang] : undefined) ??
                  "n/a"
              } else {
                setName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, asPresent(setNameRaw))
              }

              if (setName !== "") {
                if (!svLoadedAlready) {
                  lib.LoadSavedVariables()
                  svLoadedAlready = true
                }
                setIdsTable.push(asNumber(setId))
                setNamesOfLangTable[asNumber(setId)] = setName
                setNamesAdded = setNamesAdded + 1
              }
            }
          }
        }
      }
      if (asNumber(setIdToCheck) > maxSetIdChecked) {
        maxSetIdChecked = asNumber(setIdToCheck)
      }
    }
  }
  if (setNamesAdded > 0) {
    if (!svLoadedAlready) {
      lib.LoadSavedVariables()
      svLoadedAlready = true
    }
    if (svLoadedAlready === true) {
      tsort(setIdsTable)
      const sv = asPresent(lib.svDebugData)
      for (const [, setId] of ipairs(setIdsTable)) {
        const setName = setNamesOfLangTable[setId]
        if (setName !== undefined && setName !== "") {
          if (sv[LIBSETS_TABLEKEY_SETNAMES] === undefined) {
            sv[LIBSETS_TABLEKEY_SETNAMES] = {}
          }
          const setNamesSV = asSetNamesTable(sv[LIBSETS_TABLEKEY_SETNAMES])
          if (setNamesSV[setId] === undefined) {
            setNamesSV[setId] = {}
          }
          setNamesSV[setId][clientLang] = setName
        }
      }
    }
    const foundNewSetsCount = SCAN_STATE.newSetIdsFound.length
    d(
      "-->Maximum setId found: " +
        tostring(maxSetIdChecked) +
        " / Added set names: " +
        tostring(setNamesAdded) +
        " / New setIds found: " +
        tostring(foundNewSetsCount)
    )
    if (foundNewSetsCount > 0) {
      const sv = asPresent(lib.svDebugData)
      const setNamesSV = asSetNamesTableOpt(sv[LIBSETS_TABLEKEY_SETNAMES])
      for (const [, setIdNewFound] of ipairs(SCAN_STATE.newSetIdsFound)) {
        const entry = setNamesSV[setIdNewFound]
        const setNameOfNewSet =
          (entry !== undefined ? entry[clientLang] : undefined) ?? UNKNOWN_NAME
        d("--->new setId: " + tostring(setIdNewFound) + ", name: " + tostring(setNameOfNewSet))
      }
    }
    d(
      storedInSVFileLibSetsInTable +
        "'" +
        LIBSETS_TABLEKEY_SETNAMES +
        "', language: '" +
        tostring(clientLang) +
        "'"
    )
    if (noReload === true) {
      return
    }
    d(PLEASE_RELOAD_UI)
  }
}
lib.DebugGetAllSetNames = debugGetAllSetNames
DEBUG_HOLDER.debugGetAllSetNames = debugGetAllSetNames
DEBUG_HOLDER.showSetCountsScanned = showSetCountsScanned

function loadSetsByIds(
  this: void,
  packageNr: number,
  from: number,
  to: number,
  noReloadInfo?: boolean
): undefined {
  const noReload = noReloadInfo ?? false
  if (!SCAN_STATE.noFurtherItemsFound) {
    const isJewelryEquiptype = lib.isJewelryEquipType
    const isWeaponEquipType = lib.isWeaponEquipType
    const setNames = asSetNamesTableOpt(lib.setDataPreloaded[LIBSETS_TABLEKEY_SETNAMES])

    for (const setItemId of $range(from, to)) {
      SCAN_STATE.itemIdsScanned = SCAN_STATE.itemIdsScanned + 1
      const itemLink = buildItemLink(setItemId)
      if (itemLink !== undefined && itemLink !== "") {
        if (!IsItemLinkCrafted(itemLink)) {
          const [isSet, setName, , , , setId] = GetItemLinkSetInfo(itemLink, false)
          if (isSet === true) {
            const [itemType] = GetItemLinkItemType(itemLink)
            if (lib.setItemTypes[itemType] !== undefined) {
              if (SCAN_STATE.sets[setId] === undefined) {
                SCAN_STATE.sets[setId] = {}
                SCAN_STATE.setCount = SCAN_STATE.setCount + 1

                if (
                  (setName !== undefined && setNames[setId] === undefined) ||
                  (setNames[setId] !== undefined && setNames[setId][clientLang] === undefined)
                ) {
                  const setNameClean = zocstrfor(UPPER_CASE_FIRST_FORMATTER, setName)
                  if (setNameClean !== undefined) {
                    if (setNames[setId] === undefined) {
                      setNames[setId] = {}
                    }
                    asPresent(setNames[setId])[clientLang] = setNameClean
                  }
                }
              }
              SCAN_STATE.sets[setId][setItemId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK
              SCAN_STATE.itemCount = SCAN_STATE.itemCount + 1

              const equipType = GetItemLinkEquipType(itemLink)
              if (equipType > EQUIP_TYPE_INVALID) {
                if (SCAN_STATE.setsEquipTypes[equipType] === undefined) {
                  SCAN_STATE.setsEquipTypes[equipType] = {}
                }
                SCAN_STATE.setsEquipTypes[equipType][setId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK

                if (isJewelryEquiptype[equipType] !== undefined) {
                  if (SCAN_STATE.setsJewelry[setId] === undefined) {
                    SCAN_STATE.itemJewelryCount = SCAN_STATE.itemJewelryCount + 1
                  }
                  SCAN_STATE.setsJewelry[setId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK
                } else if (isWeaponEquipType[equipType] !== undefined) {
                  if (SCAN_STATE.setsWeapons[setId] === undefined) {
                    SCAN_STATE.itemWeaponsCount = SCAN_STATE.itemWeaponsCount + 1
                  }
                  SCAN_STATE.setsWeapons[setId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK

                  const weaponType = GetItemLinkWeaponType(itemLink)
                  if (weaponType > WEAPONTYPE_NONE) {
                    if (SCAN_STATE.setsWeaponTypes[weaponType] === undefined) {
                      SCAN_STATE.setsWeaponTypes[weaponType] = {}
                    }
                    SCAN_STATE.setsWeaponTypes[weaponType][setId] =
                      LIBSETS_SET_ITEMID_TABLE_VALUE_OK
                  }
                } else {
                  if (SCAN_STATE.setsArmor[setId] === undefined) {
                    SCAN_STATE.itemArmorCount = SCAN_STATE.itemArmorCount + 1
                  }
                  SCAN_STATE.setsArmor[setId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK

                  const armorType = GetItemLinkArmorType(itemLink)
                  if (armorType > ARMORTYPE_NONE) {
                    if (SCAN_STATE.setsArmorTypes[armorType] === undefined) {
                      SCAN_STATE.setsArmorTypes[armorType] = {}
                    }
                    SCAN_STATE.setsArmorTypes[armorType][setId] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  showSetCountsScanned(false, undefined, noReload, packageNr)
}
DEBUG_HOLDER.loadSetsByIds = loadSetsByIds
