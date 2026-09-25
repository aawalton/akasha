import { asNumberOpt } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  SETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES,
  SETS_TABLEKEY_DROPMECHANIC_NAMES,
  SETS_TABLEKEY_SETITEMIDS,
  SETS_TABLEKEY_SETITEMIDS_NO_SETID,
  SETS_TABLEKEY_SETNAMES,
  SETS_TABLEKEY_SETNAMES_NO_SETID,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import {
  asLangRecordOpt,
  asSetIdItemIdMap,
  asStrRecordEntryOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import {
  asSetIdLangStringMapEntryOpt,
  asSetIdToStrRecordEntryOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts-tables/sets-core-casts-tables.module.code.ts"
import { safeReturnAPItable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-helpers/sets-core-helpers.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-dlc/eso-lib-sets-dlc.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const zostc = ZO_ShallowTableCopy

const WAS_SET_ID_PROCESSED_FOR_SET_INFO_IN_TOTAL: { [setId: number]: boolean } = {}

type SetInfoTable = { [key: string]: unknown }

function getSetInfo(
  this: void,
  setId: number | undefined,
  noItemIds?: boolean,
  lang?: string
): SetInfoTable | undefined {
  if (setId === undefined) {
    return undefined
  }
  const checkIfSetsAreLoadedProperly = lib.checkIfSetsAreLoadedProperly
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const noItemIdsResolved = noItemIds ?? false
  const isNoESOSet = lib.IsNoESOSet
  const isNonEsoSetId = isNoESOSet(setId)
  let setInfoTable: SetInfoTable | undefined
  let itemIds: { [itemId: number]: number } | undefined
  let setNames: { [lang: string]: string } | undefined
  let langToUse: string | undefined
  let setNamesEmpty = true
  let gotSetItemIds = false
  let gotSetNames = false
  let gotSetDropMechanicNames = false

  let returnTab: SetInfoTable

  const tooltipSetDataWithoutItemIdsCached = asSetIdToStrRecordEntryOpt(
    lib.tooltipSetDataWithoutItemIdsCached
  )

  const onlyOneLanguage = lang !== undefined
  if (onlyOneLanguage === true) {
    if (noItemIdsResolved === true) {
      const cachedTooltipsSetDataWithoutItemIdsAndOnlyOneLang =
        tooltipSetDataWithoutItemIdsCached[setId]
      if (
        cachedTooltipsSetDataWithoutItemIdsAndOnlyOneLang !== undefined &&
        !ZO_IsTableEmpty(cachedTooltipsSetDataWithoutItemIdsAndOnlyOneLang)
      ) {
        return cachedTooltipsSetDataWithoutItemIdsAndOnlyOneLang
      }
    }
    langToUse = lib.LangAllowedCheck(lang)
  }

  const preloaded = lib.setDataPreloaded
  const noSetIdSets = lib.noSetIdSets
  const setInfo = lib.setInfo
  let preloadedSetItemIdsTableKey = SETS_TABLEKEY_SETITEMIDS
  let preloadedSetNamesTableKey = SETS_TABLEKEY_SETNAMES
  if (isNonEsoSetId === true) {
    setInfoTable = noSetIdSets[setId]
    preloadedSetItemIdsTableKey = SETS_TABLEKEY_SETITEMIDS_NO_SETID
    preloadedSetNamesTableKey = SETS_TABLEKEY_SETNAMES_NO_SETID
  } else {
    if (setInfo[setId] === undefined) {
      return undefined
    }
    setInfoTable = setInfo[setId]
  }
  if (setInfoTable === undefined) {
    return undefined
  }
  setInfoTable["setId"] = setId

  if (!WAS_SET_ID_PROCESSED_FOR_SET_INFO_IN_TOTAL[setId]) {
    if (!noItemIdsResolved) {
      if (setInfoTable[SETS_TABLEKEY_SETITEMIDS] === undefined) {
        if (isNonEsoSetId === true) {
          const preloadedItemIds = asSetIdItemIdMap(preloaded[preloadedSetItemIdsTableKey])
          itemIds = preloadedItemIds[setId]
        } else {
          const decompressSetIdItemIds = lib.DecompressSetIdItemIds
          itemIds = decompressSetIdItemIds(setId)
        }
        if (!ZO_IsTableEmpty(itemIds)) {
          setInfoTable[SETS_TABLEKEY_SETITEMIDS] = itemIds
          gotSetItemIds = true
        }
      }
    } else {
      gotSetItemIds = false
    }

    if (
      setInfoTable[SETS_TABLEKEY_DROPMECHANIC_NAMES] === undefined ||
      setInfoTable[SETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES] === undefined
    ) {
      let gotSetDropMechanicData = false
      let gotSetDropMechanicLocationData = false

      const getDropMechanicAndDropLocationNames = lib.GetDropMechanicAndDropLocationNames
      const [dropMechanicNamesRaw, dropMechanicDropLocationNamesRaw] =
        getDropMechanicAndDropLocationNames(setId, langToUse, setInfoTable)
      const dropMechanicNamesTable = asLangRecordOpt(dropMechanicNamesRaw)
      const dropMechanicDropLocationNamesTable = asLangRecordOpt(dropMechanicDropLocationNamesRaw)
      if (!ZO_IsTableEmpty(dropMechanicNamesTable)) {
        setInfoTable[SETS_TABLEKEY_DROPMECHANIC_NAMES] = dropMechanicNamesTable
        gotSetDropMechanicData = true
      }
      if (!ZO_IsTableEmpty(dropMechanicDropLocationNamesTable)) {
        setInfoTable[SETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES] = dropMechanicDropLocationNamesTable
        gotSetDropMechanicLocationData = true
      }
      if (gotSetDropMechanicData === true && gotSetDropMechanicLocationData === true) {
        gotSetDropMechanicNames = true
      }
    } else {
      gotSetDropMechanicNames = true
    }

    if (langToUse !== undefined) {
      const preloadedSetNames = asSetIdLangStringMapEntryOpt(preloaded[preloadedSetNamesTableKey])
      const setNamesOfSetId = preloadedSetNames[setId]
      const setNameInLang = setNamesOfSetId !== undefined ? setNamesOfSetId[langToUse] : undefined
      if (setNameInLang !== undefined) {
        setNames = {
          [langToUse]: setNameInLang,
        }
      }
    } else {
      const preloadedSetNames = asSetIdLangStringMapEntryOpt(preloaded[preloadedSetNamesTableKey])
      setNames = preloadedSetNames[setId]
    }

    setNamesEmpty = ZO_IsTableEmpty(setNames)
    if (!setNamesEmpty) {
      if (!onlyOneLanguage) {
        setInfoTable[SETS_TABLEKEY_SETNAMES] = setNames
        gotSetNames = true
      }
    }

    if (gotSetItemIds === true && gotSetDropMechanicNames === true && gotSetNames === true) {
      WAS_SET_ID_PROCESSED_FOR_SET_INFO_IN_TOTAL[setId] = true
    }
  }

  if (setInfoTable["isCurrentDLC"] === undefined) {
    const dlcId = asNumberOpt(setInfoTable["dlcId"])
    const isCurrentDLC =
      DLC_ITERATION_END !== undefined && dlcId !== undefined && dlcId >= DLC_ITERATION_END
    setInfoTable["isCurrentDLC"] = isCurrentDLC
  }

  returnTab = zostc(setInfoTable)

  if (noItemIdsResolved === true) {
    returnTab[SETS_TABLEKEY_SETITEMIDS] = undefined
  }

  if (!setNamesEmpty && onlyOneLanguage === true) {
    returnTab[SETS_TABLEKEY_SETNAMES] = setNames
    if (noItemIdsResolved === true) {
      tooltipSetDataWithoutItemIdsCached[setId] = returnTab
    }
  }

  return asStrRecordEntryOpt(safeReturnAPItable(returnTab))
}
lib.GetSetInfo = getSetInfo

function getTraitsNeeded(this: void, setId: number | undefined): unknown {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.IsCraftedSet(setId)) {
    return undefined
  }
  const setInfo = lib.setInfo
  const setData = setInfo[setId]
  if (setData === undefined || setData["traitsNeeded"] === undefined) {
    return undefined
  }
  return safeReturnAPItable(setData["traitsNeeded"])
}
lib.GetTraitsNeeded = getTraitsNeeded
