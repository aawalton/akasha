import { asLibSlotFns } from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asDebugGetAllDataSvOpt,
  asSearchUiKeyboardOpt,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

const EM = EVENT_MANAGER
const MAJOR = "LibSets"
const apiVersion = GetAPIVersion()
const IsConsole = lib.IsConsole

const libInternal = asLibSlotFns(lib)

function onPlayerActivated(this: void, _eventId: number, _isFirst?: unknown): undefined {
  EM.UnregisterForEvent(MAJOR, EVENT_PLAYER_ACTIVATED)

  if (lib.debugGetAllDataIsRunning === true) {
    d(
      "[" +
        lib.name +
        "]Resuming scan of 'DebugGetAllData' after reloadui - language now: " +
        tostring(lib.clientLang)
    )
    lib.DebugGetAllData(false)
  }
}

function onLibraryLoaded(this: void, _event: number, name?: string): undefined {
  if (name !== MAJOR) {
    return
  }
  EM.UnregisterForEvent(MAJOR + "_EVENT_ADD_ON_LOADED", EVENT_ADD_ON_LOADED)
  lib.startedLoading = true
  lib.setsLoaded = false

  lib.CheckOptionalLibraries()

  lib.APIVersions["live"] = lib.APIVersions["live"] ?? GetAPIVersion()
  lib.currentAPIVersion = lib.APIVersions["live"]

  let goOn = false
  lib.LoadSavedVariables()

  lib.debugGetAllDataIsRunning = false
  const svDebugData = lib.svDebugData
  const debugGetAllDataSv =
    svDebugData !== undefined ? asDebugGetAllDataSvOpt(svDebugData["DebugGetAllData"]) : undefined
  const debugGetAllDataForApi =
    debugGetAllDataSv !== undefined ? debugGetAllDataSv[apiVersion] : undefined
  if (
    svDebugData !== undefined &&
    debugGetAllDataSv !== undefined &&
    debugGetAllDataForApi !== undefined
  ) {
    if (debugGetAllDataForApi.running === true && debugGetAllDataForApi.finished === false) {
      lib.debugGetAllDataIsRunning = true
      goOn = false
      EM.RegisterForEvent(MAJOR, EVENT_PLAYER_ACTIVATED, onPlayerActivated)
    } else if (debugGetAllDataForApi.running !== true || debugGetAllDataForApi.finished === true) {
      goOn = true
    }
  } else {
    goOn = true
  }
  if (!goOn) {
    lib.setsScanning = true
    lib.fullyLoaded = false
  } else {
    lib.removeFutureSetData?.()
    lib.removeFutureSetData = undefined

    lib.LoadSets()

    lib.loadTooltipHooks()

    libInternal["_createSlashCommands"]?.()

    lib.buildLSCSetSearchAutoComplete()

    lib.fullyLoaded = true

    if (!IsConsole) {
      libInternal["_createUIStuff"]?.(IsInGamepadPreferredMode())
    }

    const onGamepadPreferredModeChanged = (
      _eventCode: number,
      gamepadPreferred?: boolean
    ): undefined => {
      if (gamepadPreferred === true) {
        const searchUiKeyboard = asSearchUiKeyboardOpt(LIBSETS_SEARCH_UI_KEYBOARD)
        if (searchUiKeyboard?.IsShown()) {
          searchUiKeyboard.HideUI()
        }
      }
      libInternal["_createSetSearchSlashCommands"]?.(!(gamepadPreferred ?? false))
      libInternal["_createUIStuff"]?.(gamepadPreferred)
      lib.loadTooltipHooks(true)
    }
    EM.RegisterForEvent(
      MAJOR + "_EVENT_GAMEPAD_PREFERRED_MODE_CHANGED",
      EVENT_GAMEPAD_PREFERRED_MODE_CHANGED,
      onGamepadPreferredModeChanged
    )
  }
}

EM.RegisterForEvent(MAJOR + "_EVENT_ADD_ON_LOADED", EVENT_ADD_ON_LOADED, onLibraryLoaded)
