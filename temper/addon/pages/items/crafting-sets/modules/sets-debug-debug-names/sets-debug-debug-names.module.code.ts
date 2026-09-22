import {
  asLangRecord,
  asNumRecordOpt,
  asPresent,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  asNewSetIdsSV,
  asSetNamesTable,
  asSetNamesTableOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-debug-casts/sets-debug-casts.module.code.ts"
import {
  apiVersion,
  clientLang,
  DEBUG_HOLDER,
  fallbackLang,
  libPrefix,
  MAJOR,
  NON_OFFICIAL_LANGUAGES,
  SCAN_STATE,
  UNKNOWN_NAME,
  worldName,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-debug-debug-state/sets-debug-debug-state.module.code.ts"
import { debugGetDungeonFinderData } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-debug-dungeon-finder/sets-debug-dungeon-finder.module.code.ts"
import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import {
  SETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES,
  SETS_TABLEKEY_COLLECTIBLE_DLC_NAMES,
  SETS_TABLEKEY_COLLECTIBLE_NAMES,
  SETS_TABLEKEY_NEWSETIDS,
  SETS_TABLEKEY_SETITEMIDS,
  SETS_TABLEKEY_SETNAMES,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import "akasha/temper/eso/type/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const zocstrfor = ZO_CachedStrFormat

const UPPER_CASE_FIRST_FORMATTER = "<<C:1>>"
lib.DebugGetDungeonFinderData = debugGetDungeonFinderData
DEBUG_HOLDER.debugGetDungeonFinderData = debugGetDungeonFinderData

function debugGetAllAchievementCategoryNames(
  this: void,
  achievementStartId?: number,
  achievementEndId?: number,
  noReloadInfo?: boolean,
  ingameList?: boolean
): undefined {
  const startId = achievementStartId ?? 1
  let endId = achievementEndId ?? lib.debugMaxCollectibleIds
  const noReload = noReloadInfo ?? false
  const inGame = ingameList ?? false

  if (NON_OFFICIAL_LANGUAGES[clientLang] !== undefined) {
    return
  }

  if (endId < startId) {
    endId = startId
  }
  d(
    libPrefix +
      "Start to load all achievements with start ID " +
      startId +
      " to end ID " +
      endId +
      "..."
  )
  let achievementCategoriesAdded = 0
  const achievementDataScanned: { [topLevelIndex: number]: string } = {}
  const alreadyAdded: { [name: string]: boolean } = {}
  for (const i of $range(startId, endId, 1)) {
    const [topLevelIndex] = GetCategoryInfoFromAchievementId(i)
    if (topLevelIndex !== undefined) {
      const [categoryNameRaw] = GetAchievementCategoryInfo(topLevelIndex)
      const achievementCategoryName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, categoryNameRaw)
      if (
        achievementCategoryName !== undefined &&
        achievementCategoryName !== "" &&
        alreadyAdded[achievementCategoryName] === undefined
      ) {
        alreadyAdded[achievementCategoryName] = true
        achievementDataScanned[topLevelIndex] =
          (!inGame ? tostring(topLevelIndex) + "|" : "") + achievementCategoryName
        achievementCategoriesAdded = achievementCategoriesAdded + 1
      }
    }
  }
  if (achievementCategoriesAdded > 0) {
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    if (sv[SETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES] === undefined) {
      sv[SETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES] = {}
    }
    const achSV = asLangRecord(sv[SETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES])
    achSV[clientLang] = achievementDataScanned
    d(
      "->Stored " +
        tostring(achievementCategoriesAdded) +
        " entries in SaveVariables file '" +
        MAJOR +
        ".lua', in the table '" +
        SETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES +
        "', language: '" +
        tostring(clientLang) +
        "'\nPlease do a /reloadui or logout to update the SavedVariables data now!"
    )
    if (noReload === true) {
      return
    }
    d("Please do a /reloadui or logout to update the SavedVariables data now!")
  }
}
lib.DebugGetAllAchievementCategoryNames = debugGetAllAchievementCategoryNames
DEBUG_HOLDER.debugGetAllAchievementCategoryNames = debugGetAllAchievementCategoryNames

function debugGetAllCollectibleDLCNames(this: void, noReloadInfo?: boolean): undefined {
  const noReload = noReloadInfo ?? false

  if (NON_OFFICIAL_LANGUAGES[clientLang] !== undefined) {
    return
  }

  const dlcNames: { [collectibleId: number]: string } = {}
  let collectiblesAdded = 0
  d(libPrefix + "Start to load all DLC collectibles")
  for (const collectibleIndex of $range(
    1,
    GetTotalCollectiblesByCategoryType(COLLECTIBLE_CATEGORY_TYPE_DLC)
  )) {
    const collectibleId = GetCollectibleIdFromType(COLLECTIBLE_CATEGORY_TYPE_DLC, collectibleIndex)
    const [rawName] = GetCollectibleInfo(collectibleId)
    const collectibleName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, rawName)
    dlcNames[collectibleId] = collectibleId + "|DLC|" + collectibleName
    collectiblesAdded = collectiblesAdded + 1
  }
  for (const collectibleIndex of $range(
    1,
    GetTotalCollectiblesByCategoryType(COLLECTIBLE_CATEGORY_TYPE_CHAPTER)
  )) {
    const collectibleId = GetCollectibleIdFromType(
      COLLECTIBLE_CATEGORY_TYPE_CHAPTER,
      collectibleIndex
    )
    const [rawName] = GetCollectibleInfo(collectibleId)
    const collectibleName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, rawName)
    dlcNames[collectibleId] = collectibleId + "|CHAPTER|" + collectibleName
    collectiblesAdded = collectiblesAdded + 1
  }
  if (collectiblesAdded > 0) {
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    if (sv[SETS_TABLEKEY_COLLECTIBLE_DLC_NAMES] === undefined) {
      sv[SETS_TABLEKEY_COLLECTIBLE_DLC_NAMES] = {}
    }
    const dlcSV = asLangRecord(sv[SETS_TABLEKEY_COLLECTIBLE_DLC_NAMES])
    dlcSV[clientLang] = dlcNames
    d(
      "->Stored " +
        tostring(collectiblesAdded) +
        " entries in SaveVariables file '" +
        MAJOR +
        ".lua', in the table '" +
        SETS_TABLEKEY_COLLECTIBLE_DLC_NAMES +
        "', language: '" +
        tostring(clientLang) +
        "'"
    )
    if (noReload === true) {
      return
    }
    d("Please do a /reloadui or logout to update the SavedVariables data now!")
  }
}
lib.DebugGetAllCollectibleDLCNames = debugGetAllCollectibleDLCNames
DEBUG_HOLDER.debugGetAllCollectibleDLCNames = debugGetAllCollectibleDLCNames

function debugGetAllCollectibleNames(this: void, noReloadInfo?: boolean): undefined {
  const noReload = noReloadInfo ?? false

  if (NON_OFFICIAL_LANGUAGES[clientLang] !== undefined) {
    return
  }

  const collectibleNames: { [collectibleId: number]: string } = {}
  let collectiblesAdded = 0
  d(libPrefix + "Start to load all collectibles")

  for (const collectibleCategoryIndex of $range(1, GetNumCollectibleCategories(), 1)) {
    for (const collectibleIndex of $range(
      1,
      GetTotalCollectiblesByCategoryType(collectibleCategoryIndex)
    )) {
      const collectibleId = GetCollectibleIdFromType(collectibleCategoryIndex, collectibleIndex)
      if (collectibleId !== undefined && collectibleId !== 0) {
        const [rawName] = GetCollectibleInfo(collectibleId)
        if (rawName !== undefined && rawName !== "") {
          const collectibleName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, rawName)
          collectibleNames[collectibleId] = collectibleId + "|DLC|" + collectibleName
          collectiblesAdded = collectiblesAdded + 1
        }
      }
    }
  }
  if (collectiblesAdded > 0) {
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    if (sv[SETS_TABLEKEY_COLLECTIBLE_NAMES] === undefined) {
      sv[SETS_TABLEKEY_COLLECTIBLE_NAMES] = {}
    }
    const colSV = asLangRecord(sv[SETS_TABLEKEY_COLLECTIBLE_NAMES])
    colSV[clientLang] = collectibleNames
    d(
      "->Stored " +
        tostring(collectiblesAdded) +
        " entries in SaveVariables file '" +
        MAJOR +
        ".lua', in the table '" +
        SETS_TABLEKEY_COLLECTIBLE_NAMES +
        "', language: '" +
        tostring(clientLang) +
        "'"
    )
    if (noReload === true) {
      return
    }
    d("Please do a /reloadui or logout to update the SavedVariables data now!")
  }
}
lib.DebugGetAllCollectibleNames = debugGetAllCollectibleNames

function debugShowNewSetIds(this: void, noChatOutput?: boolean): undefined {
  const noChat = noChatOutput ?? false
  if (!noChat) {
    d(libPrefix + "DebugShowNewSetIds - Checking for new setIds...")
  }

  const newSetsLoadedFromSV = false
  let tempSetNamesOfClientLang: { [setId: number]: string } | undefined
  asPresent(DEBUG_HOLDER.checkForNewSetIds)(
    asNumRecordOpt(lib.setDataPreloaded[SETS_TABLEKEY_SETITEMIDS]),
    undefined,
    true,
    true
  )
  const newSetsFound = SCAN_STATE.newSetIdsFound.length
  if (newSetsFound > 0) {
    if (!noChat) {
      d(">Found " + tostring(newSetsFound) + " new setIds!")
    }
    const preloadedSetNames = asSetNamesTableOpt(lib.setDataPreloaded[SETS_TABLEKEY_SETNAMES])
    for (const [, newSetId] of ipairs(SCAN_STATE.newSetIdsFound)) {
      const entry = preloadedSetNames[newSetId]
      let newSetName = entry !== undefined ? (entry[clientLang] ?? entry[fallbackLang]) : undefined
      if (newSetName === undefined || newSetName === "") {
        newSetName = asPresent(DEBUG_HOLDER.getNewSetName)(newSetId)
      }
      newSetName = zocstrfor(UPPER_CASE_FIRST_FORMATTER, newSetName)
      if (!noChat) {
        df(">>New setId found: %s -> name: %s", tostring(newSetId), tostring(newSetName))
      }
      if (newSetName !== undefined && newSetName !== UNKNOWN_NAME) {
        if (tempSetNamesOfClientLang === undefined) {
          tempSetNamesOfClientLang = {}
        }
        tempSetNamesOfClientLang[newSetId] = newSetName
      }
    }
  }
  if (newSetsFound === 0) {
    if (!noChat) {
      return
    }
    d("<No new setIds were found!\nDid you run function 'DebugScanAllSetData()' already?")
    d(
      "Please read the description of DebugScanAllSetData to be able to update the internal tables 'setDataPreloaded['setItemIds'] properly, before you try to search for new setIds!"
    )
  } else {
    if (!newSetsLoadedFromSV) {
      lib.LoadSavedVariables()
    }
    const sv = asPresent(lib.svDebugData)
    const apiVersionUpdatedStr = tostring(apiVersion) + "_UpdateInfo"
    if (sv[SETS_TABLEKEY_NEWSETIDS] === undefined) {
      sv[SETS_TABLEKEY_NEWSETIDS] = {}
    }
    const newSetIdsSV = asNewSetIdsSV(sv[SETS_TABLEKEY_NEWSETIDS])
    if (newSetIdsSV[worldName] === undefined) {
      newSetIdsSV[worldName] = {}
    }
    const newSetIdsSVForWorld = asPresent(newSetIdsSV[worldName])
    newSetIdsSVForWorld[tostring(apiVersion)] = SCAN_STATE.newSetIdsFound
    newSetIdsSVForWorld[apiVersionUpdatedStr] = {
      UpdateType: "DebugShowNewSetIds()",
      DateTime: os.date("%c"),
    }
    if (tempSetNamesOfClientLang !== undefined) {
      if (sv[SETS_TABLEKEY_SETNAMES] === undefined) {
        sv[SETS_TABLEKEY_SETNAMES] = {}
      }
      const setNamesSV = asSetNamesTable(sv[SETS_TABLEKEY_SETNAMES])
      for (const [setId, setName] of pairs(tempSetNamesOfClientLang)) {
        if (setNamesSV[setId] === undefined) {
          setNamesSV[setId] = {}
        }
        setNamesSV[setId][clientLang] = setName
      }
    }
  }
}
lib.DebugShowNewSetIds = debugShowNewSetIds
DEBUG_HOLDER.debugShowNewSetIds = debugShowNewSetIds

function debugGetAllNames(this: void, noReloadInfo?: boolean): undefined {
  const noReload = noReloadInfo ?? false
  debugGetAllAchievementCategoryNames(undefined, undefined, noReload)
  d(">>>--------------->>>")
  debugGetAllCollectibleDLCNames(noReload)
  d(">>>--------------->>>")
  asPresent(DEBUG_HOLDER.debugGetAllMapNames)()
  d(">>>--------------->>>")
  asPresent(DEBUG_HOLDER.debugGetAllWayshrineNames)()
  d(">>>--------------->>>")
  asPresent(DEBUG_HOLDER.debugGetAllZoneInfo)()
  d(">>>--------------->>>")
  asPresent(DEBUG_HOLDER.debugGetAllSetNames)(noReload)
}
lib.DebugGetAllNames = debugGetAllNames
DEBUG_HOLDER.debugGetAllNames = debugGetAllNames
