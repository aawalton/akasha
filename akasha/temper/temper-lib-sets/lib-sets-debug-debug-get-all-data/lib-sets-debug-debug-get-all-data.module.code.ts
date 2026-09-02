import { asBooleanOpt, asNumber, asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asDebugGetAllDataSV,
  asSetNamesTable,
  type DebugGetAllDataRun,
} from "../lib-sets-debug-casts/lib-sets-debug-casts.module.code.ts"
import {
  apiVersion,
  clientLang,
  DEBUG_HOLDER,
  fallbackLang,
  libPrefix,
  NON_OFFICIAL_LANGUAGES,
  numSupportedLangsForDebug,
  SCAN_STATE,
  SUPPORTED_LANGUAGES,
  storedInSVFileLibSetsInTable,
} from "../lib-sets-debug-debug-state/lib-sets-debug-debug-state.module.code.ts"

const lib = LibSets

function debugGetAllData(this: void, ...args: unknown[]): undefined {
  const resetApiData = asBooleanOpt(args[0])
  const noItemIds = asBooleanOpt(args[1])
  const onlyNames = asBooleanOpt(args[2])
  const resetApi = resetApiData ?? false
  const noItems = noItemIds ?? false

  let newRun = false
  let languageToScanNext: string | undefined
  let alreadyFinished = false

  lib.LoadSavedVariables()
  const sv = asPresent(lib.svDebugData)
  if (sv["DebugGetAllData"] === undefined) {
    sv["DebugGetAllData"] = {}
  }
  const debugGetAllDataSV = asDebugGetAllDataSV(sv["DebugGetAllData"])

  const existingRun = debugGetAllDataSV[apiVersion]
  if (resetApi === true || existingRun === undefined) {
    newRun = true
    const freshRun: DebugGetAllDataRun = {}
    debugGetAllDataSV[apiVersion] = freshRun
    freshRun.clientLang = clientLang
    freshRun.running = true
    freshRun.DateTimeStart = os.date("%c")
  } else if (existingRun.running !== undefined) {
    alreadyFinished = existingRun.finished === true
  } else {
    return
  }
  const apiRun = asPresent(debugGetAllDataSV[apiVersion])

  d(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  d(
    libPrefix +
      ">>>DebugGetAllData START for API '" +
      tostring(apiVersion) +
      "' - newRun: " +
      tostring(newRun) +
      ", resetApiData: " +
      tostring(resetApi) +
      ", noItemIds: " +
      tostring(noItems)
  )
  if (!alreadyFinished) {
    if (newRun === true) {
      asPresent(DEBUG_HOLDER.debugResetSavedVariables)(true, onlyNames)
      if (!noItems) {
        d(">>>--------------->>>")
        asPresent(DEBUG_HOLDER.scanAllSetData)(false, true)
        d(">>>--------------->>>")
      } else {
        SCAN_STATE.noFurtherItemsFound = true
      }
    } else {
      SCAN_STATE.noFurtherItemsFound = true
    }
    const noFurtherItemsFoundUpdateName = lib.name + "_RunIfNoFurtherItemsFound"
    EVENT_MANAGER.UnregisterForUpdate(noFurtherItemsFoundUpdateName)
    const runIfNoFurtherItemsFound = (): undefined => {
      if (!SCAN_STATE.noFurtherItemsFound) {
        return
      }
      SCAN_STATE.noFurtherItemsFound = false
      EVENT_MANAGER.UnregisterForUpdate(noFurtherItemsFoundUpdateName)

      if (apiRun.langDone === undefined) {
        apiRun.langDone = {}
      }
      const langDone = apiRun.langDone
      langDone[clientLang] = os.date("%c")

      for (const [langStr] of pairs(NON_OFFICIAL_LANGUAGES)) {
        langDone[langStr] = true
      }

      asPresent(DEBUG_HOLDER.debugShowNewSetIds)(true)
      asPresent(DEBUG_HOLDER.debugGetAllNames)(true)
      d(">>>--------------->>>")

      let delay = 0
      if (newRun === true) {
        asPresent(DEBUG_HOLDER.debugGetDungeonFinderData)(undefined, true)
        d(">>>--------------->>>")
        delay = 500
        zo_callLater((): undefined => {
          asPresent(DEBUG_HOLDER.debugGetAllWayshrineInfoOfCurrentMap)()
        }, delay)
      }

      delay = delay + 500
      zo_callLater((): undefined => {
        d(libPrefix + "<<<DebugGetAllData END - lang: " + tostring(clientLang))
        d("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

        const numLangsScanned = NonContiguousCount(asPresent(apiRun.langDone))
        if (numLangsScanned < numSupportedLangsForDebug) {
          for (const [langStr, isSupported] of pairs(SUPPORTED_LANGUAGES)) {
            const langCode = tostring(langStr)
            if (isSupported === true) {
              if (asPresent(apiRun.langDone)[langCode] === undefined) {
                languageToScanNext = langCode
                break
              }
            }
          }
          if (
            languageToScanNext !== undefined &&
            languageToScanNext !== "" &&
            SUPPORTED_LANGUAGES[languageToScanNext] === true
          ) {
            apiRun.finished = false
            apiRun.running = true
            apiRun.LanguageChangeDateTime = os.date("%c")
            apiRun.LanguageChangeTo = languageToScanNext
            SetCVar("language.2", languageToScanNext)
          } else {
            const errorText =
              "<<<[ERROR]Language to scan next '" +
              tostring(languageToScanNext) +
              "' is not supported! Aborting now..."
            d(errorText)
            apiRun.running = false
            apiRun.finished = true
            const dateTime = os.date("%c")
            apiRun.DateTimeEnd = dateTime
            apiRun.LastErrorDateTime = dateTime
            apiRun.LastError = errorText
          }
        } else {
          const origClientLang = apiRun.clientLang ?? fallbackLang
          d(
            libPrefix +
              "DebugGetAllData was finished! Resetting to your original language again: " +
              tostring(origClientLang)
          )
          apiRun.running = false
          apiRun.finished = true
          apiRun.DateTimeEnd = os.date("%c")
          SetCVar("language.2", origClientLang)
        }
      }, delay)
    }
    EVENT_MANAGER.RegisterForUpdate(noFurtherItemsFoundUpdateName, 2000, runIfNoFurtherItemsFound)
  } else {
    const errorText =
      "> APIversion '" +
      tostring(apiVersion) +
      "' was scanned and updated already on: " +
      tostring(apiRun.DateTimeEnd)
    apiRun.LastErrorDateTime = os.date("%c")
    apiRun.LastError = errorText
    d(errorText)
    d(libPrefix + "<<<DebugGetAllData END - lang: " + tostring(clientLang))
    d("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
  }
}
lib.DebugGetAllData = debugGetAllData

const OTHER_LANG_SET_NAMES: {
  [lang: string]: { [setId: number]: { [lang: string]: string } }
} = {}

function debugBuildMixedSetNames(this: void): undefined {
  d(
    libPrefix +
      "Start to combine entries from table 'otherLangSetNames' in file 'LibSets_Debug.lua' into table 'LibSets.setDataPreloaded[" +
      LIBSETS_TABLEKEY_SETNAMES +
      "]'"
  )
  if (OTHER_LANG_SET_NAMES === undefined) {
    return
  }
  if (lib.setDataPreloaded === undefined) {
    return
  }
  const preloadedSetNames = lib.setDataPreloaded[LIBSETS_TABLEKEY_SETNAMES]
  if (preloadedSetNames === undefined) {
    return
  }
  const copyOfPreloadedSetNames = asSetNamesTable(ZO_DeepTableCopy(preloadedSetNames))
  if (copyOfPreloadedSetNames === undefined) {
    return
  }
  let setIdsFound = 0
  let setIdsChanged = 0
  let setIdsChangedTotal = 0
  for (const [lang, langDataToCombine] of pairs(OTHER_LANG_SET_NAMES)) {
    setIdsFound = 0
    setIdsChanged = 0
    for (const [setId, setDataToCombine] of pairs(langDataToCombine)) {
      setIdsFound = setIdsFound + 1
      const setDataToCombineForLangKey = setDataToCombine[lang]
      if (setDataToCombineForLangKey !== undefined && setDataToCombineForLangKey !== "") {
        const setIdNum = asNumber(tonumber(setId))
        if (copyOfPreloadedSetNames[setIdNum] === undefined) {
          copyOfPreloadedSetNames[setIdNum] = {}
        }
        copyOfPreloadedSetNames[setIdNum][lang] = setDataToCombineForLangKey
        setIdsChanged = setIdsChanged + 1
        setIdsChangedTotal = setIdsChangedTotal + setIdsChanged
      }
    }
    if (setIdsChanged > 0) {
      d(
        "<Updated " +
          tostring(setIdsChanged) +
          "/" +
          tostring(setIdsFound) +
          " setNames for language: " +
          tostring(lang)
      )
    }
  }
  if (setIdsChangedTotal > 0) {
    lib.LoadSavedVariables()
    const sv = asPresent(lib.svDebugData)
    sv[LIBSETS_TABLEKEY_MIXED_SETNAMES] = copyOfPreloadedSetNames
    d(
      storedInSVFileLibSetsInTable +
        "'" +
        LIBSETS_TABLEKEY_MIXED_SETNAMES +
        "'\nPlease do a /reloadui or logout to update the SavedVariables data now!"
    )
  } else {
    d("<No setIds were updated!")
  }
}
lib.debugBuildMixedSetNames = debugBuildMixedSetNames
