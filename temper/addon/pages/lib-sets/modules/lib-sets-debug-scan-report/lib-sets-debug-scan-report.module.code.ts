import {
  asNumber,
  asPresent,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asNewSetIdsSV,
  asSetNamesTableOpt,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-debug-casts/lib-sets-debug-casts.module.code.ts"
import {
  apiVersion,
  clientLang,
  DEBUG_HOLDER,
  DEBUG_OUTPUT_START_LINE,
  fallbackLang,
  libPrefix,
  MAJOR,
  SCAN_STATE,
  UNKNOWN_NAME,
  worldName,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-debug-debug-state/lib-sets-debug-debug-state.module.code.ts"
import { lib } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-lib/lib-sets-lib.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-sets/lib-sets-table-keys/lib-sets-table-keys.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

export function showSetCountsScanned(
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
            newSetName = ZO_CachedStrFormat("<<C:1>>", newSetName)
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
