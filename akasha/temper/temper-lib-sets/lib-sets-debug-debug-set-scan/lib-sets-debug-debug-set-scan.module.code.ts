import { asNumber, asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asNewSetIdsSV,
  asSetNamesTable,
  asSetNamesTableOpt,
} from "../lib-sets-debug-casts/lib-sets-debug-casts.module.code.ts"
import { getAllSetItemIds } from "../lib-sets-debug-debug-helpers/lib-sets-debug-debug-helpers.module.code.ts"
import {
  apiVersion,
  clientLang,
  DEBUG_HOLDER,
  DEBUG_OUTPUT_START_LINE,
  fallbackLang,
  libPrefix,
  MAJOR,
  PLEASE_RELOAD_UI,
  SCAN_STATE,
  storedInSVFileLibSetsInTable,
  UNKNOWN_NAME,
  worldName,
} from "../lib-sets-debug-debug-state/lib-sets-debug-debug-state.module.code.ts"

const lib = LibSets

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

function showSetCountsScanned(
  this: void,
  finished: boolean,
  keepUncompressedetItemIds: boolean | undefined,
  noReloadInfo: boolean,
  packageNr: number | string
): undefined {
  const noReload = noReloadInfo
  const keepUncompressed = keepUncompressedetItemIds ?? false
  let isFinished = finished
  if (!isFinished && SCAN_STATE.noFurtherItemsFound === true) {
    isFinished = true
  }

  d(
    DEBUG_OUTPUT_START_LINE +
      libPrefix +
      "Scanned package '" +
      tostring(packageNr) +
      "' - itemIds: " +
      tostring(SCAN_STATE.itemIdsScanned)
  )
  d("-> Sets found: " + tostring(SCAN_STATE.setCount))
  d("-> Set items found: " + tostring(SCAN_STATE.itemCount))
  df(
    "-->Armor: %s / Jewelry: %s / Weapons: %s",
    tostring(SCAN_STATE.itemArmorCount),
    tostring(SCAN_STATE.itemJewelryCount),
    tostring(SCAN_STATE.itemWeaponsCount)
  )

  if (isFinished === true) {
    SCAN_STATE.noFurtherItemsFound = true
    SCAN_STATE.newSetIdsFound = []
    let newSetsFound = 0
    let temporarilyText = ""
    if (!keepUncompressed) {
      temporarilyText = " temporarily"
    }
    d(
      ">>> " +
        libPrefix +
        " Scanning of sets has finished! SavedVariables file '" +
        MAJOR +
        ".lua' table '" +
        LIBSETS_TABLEKEY_SETITEMIDS +
        "' was" +
        temporarilyText +
        " written! <<<"
    )
    if (SCAN_STATE.setCount > 0) {
      asPresent(DEBUG_HOLDER.checkForNewSetIds)(SCAN_STATE.sets, undefined, false, false)
      newSetsFound = SCAN_STATE.newSetIdsFound.length
      if (newSetsFound > 0) {
        d(">> !!! Found " + tostring(newSetsFound) + " new setIds !!!")
        for (const [idx, newSetId] of ipairs(SCAN_STATE.newSetIdsFound)) {
          let newSetName: string | undefined
          const preloadedSetNames = asSetNamesTableOpt(
            lib.setDataPreloaded[LIBSETS_TABLEKEY_SETNAMES]
          )
          if (preloadedSetNames[newSetId] !== undefined) {
            newSetName =
              preloadedSetNames[newSetId][clientLang] ?? preloadedSetNames[newSetId][fallbackLang]
          }
          if (newSetName === undefined) {
            newSetName = UNKNOWN_NAME
          }
          if (newSetName !== UNKNOWN_NAME) {
            newSetName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, newSetName)
          } else {
            newSetName =
              UNKNOWN_NAME +
              " - Name unknown in LibSets.setDataPreloaded['" +
              LIBSETS_TABLEKEY_SETNAMES +
              "']"
          }
          df(
            ">>>New setId found at index %s: %s -> name: %s",
            tostring(idx),
            tostring(newSetId),
            tostring(newSetName)
          )
          SCAN_STATE.newSetIdsFound[asNumber(idx) - 1] = newSetId
        }
      }

      lib.LoadSavedVariables()
      const sv = asPresent(lib.svDebugData)
      if (newSetsFound > 0) {
        const apiVersionUpdatedStr = tostring(apiVersion) + "_UpdateInfo"
        if (sv[LIBSETS_TABLEKEY_NEWSETIDS] === undefined) {
          sv[LIBSETS_TABLEKEY_NEWSETIDS] = {}
        }
        const newSetIdsSV = asNewSetIdsSV(sv[LIBSETS_TABLEKEY_NEWSETIDS])
        if (newSetIdsSV[worldName] === undefined) {
          newSetIdsSV[worldName] = {}
        }
        const newSetIdsSVForWorld = asPresent(newSetIdsSV[worldName])
        newSetIdsSVForWorld[tostring(apiVersion)] = SCAN_STATE.newSetIdsFound
        newSetIdsSVForWorld[apiVersionUpdatedStr] = {
          UpdateType: "LibSets.DebugScanAllSetData()",
          DateTime: os.date("%c"),
        }
      }

      sv[LIBSETS_TABLEKEY_SETITEMIDS] = SCAN_STATE.sets
      sv[LIBSETS_TABLEKEY_SETS_EQUIP_TYPES] = SCAN_STATE.setsEquipTypes
      sv[LIBSETS_TABLEKEY_SETS_ARMOR_TYPES] = SCAN_STATE.setsArmorTypes
      sv[LIBSETS_TABLEKEY_SETS_JEWELRY] = SCAN_STATE.setsJewelry
      sv[LIBSETS_TABLEKEY_SETS_WEAPONS_TYPES] = SCAN_STATE.setsWeaponTypes

      asPresent(DEBUG_HOLDER.compressSetItemIdsNow)(SCAN_STATE.sets, noReload)
      if (!keepUncompressed) {
        sv[LIBSETS_TABLEKEY_SETITEMIDS] = undefined
        d(
          ">>> SavedVariables file '" +
            MAJOR +
            ".lua's table '" +
            LIBSETS_TABLEKEY_SETITEMIDS +
            "' was deleted again to free space and speed-up the loading screens! <<<"
        )
      }
    }
  } else {
    if (SCAN_STATE.lastSetsCount > 0 && SCAN_STATE.setCount > 0) {
      if (
        SCAN_STATE.lastFoundPackageNr > 0 &&
        asNumber(packageNr) - SCAN_STATE.lastFoundPackageNr >= 10
      ) {
        if (SCAN_STATE.lastSetsCount === SCAN_STATE.setCount) {
          SCAN_STATE.noFurtherItemsFound = true
        }
      }
    }
    if (!SCAN_STATE.noFurtherItemsFound) {
      if (
        SCAN_STATE.setCount > 0 &&
        (SCAN_STATE.lastSetsCount === 0 || SCAN_STATE.setCount > SCAN_STATE.lastSetsCount)
      ) {
        SCAN_STATE.lastFoundPackageNr = asNumber(packageNr)
      }
      SCAN_STATE.lastSetsCount = SCAN_STATE.setCount
    }
  }
  d("<<" + DEBUG_OUTPUT_START_LINE)
}
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
