import { asLibSlotFns } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import { asDebugGetAllDataSvOpt } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-core-casts-tables/sets-core-casts-tables.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import { getKeyboardSearchUI } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-searchui-globals/sets-search-ui-searchui-globals.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/crafting/modules/crafting-constants/crafting-constants.module.code.ts"

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
  if (name !== ADDON_NAME) {
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
        const searchUiKeyboard = getKeyboardSearchUI()
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
