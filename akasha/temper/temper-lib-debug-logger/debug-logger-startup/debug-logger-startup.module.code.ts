import { asPreHookFn } from "../debug-logger-casts/debug-logger-casts.module.code.ts"
import { INTERNAL, LIB } from "../debug-logger-state/debug-logger-state.module.code.ts"

declare const debug: { traceback: (this: void, message?: string, level?: number) => string }

function parseLuaCapture(captured: string | undefined): string | undefined {
  return captured
}

const LDL_LOGGER_CONFIG = { tag: LIB.id }
const LDL_LOGGER_PERF_CONFIG = { tag: `${LIB.id}/PerformanceStats` }

const UNKNOWN_STATE_STRING = "unknown state (%d)"
const STATE_STRING: Record<number, string> = {
  [ADDON_STATE_NO_STATE]: "no state",
  [ADDON_STATE_TOC_LOADED]: "toc loaded",
  [ADDON_STATE_ENABLED]: "enabled",
  [ADDON_STATE_DISABLED]: "disabled",
  [ADDON_STATE_VERSION_MISMATCH]: "out of date",
  [ADDON_STATE_DEPENDENCIES_DISABLED]: "missing dependency",
  [ADDON_STATE_ERROR_STATE_UNABLE_TO_LOAD]: "failed to load",
}
const PLATFORMS: Record<number, string> = {
  [PLATFORM_SERVICE_TYPE_ZOS]: "PC",
  [PLATFORM_SERVICE_TYPE_PSN]: "Playstation",
  [PLATFORM_SERVICE_TYPE_XBL]: "Xbox",
  [PLATFORM_SERVICE_TYPE_DMM]: "PC - DMM",
  [PLATFORM_SERVICE_TYPE_STEAM]: "PC - Steam",
  [PLATFORM_SERVICE_TYPE_EPIC]: "PC - Epic",
}

const FULLSCREEN_MODE: Record<string, string> = {
  [tostring(FULLSCREEN_MODE_FULLSCREEN_EXCLUSIVE)]: "fullscreen",
  [tostring(FULLSCREEN_MODE_FULLSCREEN_WINDOWED)]: "fullscreen windowed",
  [tostring(FULLSCREEN_MODE_WINDOWED)]: "windowed",
}

const GAMEPAD_TYPE: Record<number, string> = {
  [GAMEPAD_TYPE_NONE]: "no gamepad",
  [GAMEPAD_TYPE_XBOX]: "xbox gamepad",
  [GAMEPAD_TYPE_PS4]: "ps4 gamepad",
  [GAMEPAD_TYPE_SWITCH]: "switch gamepad",
  [GAMEPAD_TYPE_STADIA]: "stadia gamepad",
  [GAMEPAD_TYPE_PS5]: "ps5 gamepad",
  [GAMEPAD_TYPE_XBSX]: "xbox series-x gamepad",
}

const AddOnManager = GetAddOnManager()
let NUM_ADDONS = 0
let NUM_ENABLED_ADDONS = 0
const ADD_ON_INFO: Record<string, string | undefined> = {}
const SKIPPED_ADD_ON_INFO: Record<string, string | undefined> = {}

function getMissingDependencyInfo(i: number): string {
  const info: string[] = []
  for (let j = 1; j <= AddOnManager.GetAddOnNumDependencies(i); j++) {
    const [
      dependencyName,
      dependencyExists,
      dependencyActive,
      dependencyMinVersion,
      dependencyVersion,
    ] = AddOnManager.GetAddOnDependencyInfo(i, j)
    const dependencyTooLowVersion = dependencyVersion < dependencyMinVersion
    if (!dependencyActive || !dependencyExists || dependencyTooLowVersion) {
      let reason: string | undefined
      if (!dependencyExists) {
        reason = "missing"
      } else if (!dependencyActive) {
        reason = "disabled"
      } else if (dependencyTooLowVersion) {
        reason = "outdated"
      }
      info[info.length] = string.format("%s: %s", reason, dependencyName)
    }
  }
  if (info.length > 0) {
    return string.format(" (%s)", table.concat(info, ", "))
  }
  return ""
}

function generateDebugInfo(this: void): string {
  const buildInfo = ScriptBuildInfo()
  const graphicsInfo: string[] = [GetCVar("GraphicsDriver.7")]
  if (IsMacUI()) {
    graphicsInfo[graphicsInfo.length] = "mac ui"
  }
  if (IsMinSpecMachine()) {
    graphicsInfo[graphicsInfo.length] = "min spec"
  }

  let customScale: string
  if (GetSetting(SETTING_TYPE_UI, UI_SETTING_USE_CUSTOM_SCALE) === "1") {
    customScale = string.format(
      "custom scale (%s; %s)",
      tostring(GetUICustomScale()),
      tostring(GetUIGlobalScale())
    )
  } else {
    customScale = string.format("default scale (%s)", tostring(GetUIGlobalScale()))
  }

  const [trialInfo] = GetTrialInfo()
  const debugInfo: (string | number)[] = [
    "",
    GetDisplayName(),
    GetUnitName("player"),
    INTERNAL.formatTime(INTERNAL.SESSION_START_TIME),
    string.format("%s (%s)", GetESOVersionString(), GetAPIVersion()),
    GetWorldName(),
    string.format("%s (%s)", PLATFORMS[GetPlatformServiceType()] ?? "", buildInfo.Platform),
    IsInGamepadPreferredMode() ? "gamepad" : "keyboard",
    IsESOPlusSubscriber() ? "eso+" : "regular",
    GetCVar("language.2"),
    GetKeyboardLayout(),
    string.format("addon count: %d/%d", NUM_ENABLED_ADDONS, NUM_ADDONS),
    AddOnManager.GetLoadOutOfDateAddOns() ? "allow outdated" : "block outdated",
    string.format(
      "%s (%s)",
      FULLSCREEN_MODE[GetSetting(SETTING_TYPE_GRAPHICS, GRAPHICS_SETTING_FULLSCREEN)] ?? "",
      table.concat(graphicsInfo, "; ")
    ),
    string.format("%d x %d", GuiRoot.GetWidth(), GuiRoot.GetHeight()),
    customScale,
    GAMEPAD_TYPE[GetMostRecentGamepadType()] ?? "",
    trialInfo > 0 ? "trial account" : "regular account",
    GetCVar("ForceConsoleFlow.2") === "1" ? "force console flow" : "no console flow",
  ]
  return table.concat(debugInfo, "\n")
}

function logPerformance(this: void, trigger: string, extra?: string): undefined {
  if (INTERNAL.logPerformanceStats !== true) return
  INTERNAL.Log(
    INTERNAL.LOG_LEVEL_DEBUG,
    LDL_LOGGER_PERF_CONFIG,
    "fps: %.2f, latency: %d, memory usage: %d, trigger: %s, extra: %s",
    GetFramerate(),
    GetLatency(),
    collectgarbage("count") * 1024,
    trigger,
    extra ?? ""
  )
}

function logErrorMessage(this: void, errorString: string, errorCode?: number): undefined {
  const [messageCapture, stacktraceCapture] = string.match(
    errorString,
    "(.+)\n(stack traceback:.+)"
  )
  const message = parseLuaCapture(messageCapture) ?? errorString
  const stacktrace = parseLuaCapture(stacktraceCapture)

  INTERNAL.LogRaw(INTERNAL.LOG_LEVEL_ERROR, INTERNAL.TAG_INGAME, message, stacktrace, errorCode)
}

function logChatMessage(this: void, _self: unknown, text: string): boolean | undefined {
  let stacktrace: string | undefined
  if (INTERNAL.settings.logTraces) {
    stacktrace = debug.traceback()
  }

  INTERNAL.LogRaw(INTERNAL.LOG_LEVEL_INFO, INTERNAL.TAG_INGAME, text, stacktrace)
  return INTERNAL.blockChatOutput
}

const IGNORED_SOUND_IDS: (string | undefined)[] = [
  SOUNDS.ABILITY_NOT_READY,
  SOUNDS.ABILITY_TARGET_OUT_OF_RANGE,
  SOUNDS.ABILITY_TARGET_OUT_OF_LOS,
  SOUNDS.ABILITY_TARGET_IMMUNE,
  SOUNDS.ABILITY_CASTER_SILENCED,
  SOUNDS.ABILITY_CASTER_STUNNED,
  SOUNDS.ABILITY_CASTER_BUSY,
  SOUNDS.ABILITY_TARGET_BAD_TARGET,
  SOUNDS.ABILITY_TARGET_DEAD,
  SOUNDS.ABILITY_CASTER_DEAD,
  SOUNDS.ABILITY_NOT_ENOUGH_STAMINA,
  SOUNDS.ABILITY_NOT_ENOUGH_MAGICKA,
  SOUNDS.ABILITY_NOT_ENOUGH_HEALTH,
  SOUNDS.ABILITY_NOT_ENOUGH_ULTIMATE,
  SOUNDS.ABILITY_FAILED,
  SOUNDS.ABILITY_FAILED_IN_COMBAT,
  SOUNDS.ABILITY_FAILED_REQUIREMENTS,
  SOUNDS.ABILITY_CASTER_FEARED,
  SOUNDS.ABILITY_CASTER_DISORIENTED,
  SOUNDS.ABILITY_TARGET_TOO_CLOSE,
  SOUNDS.ABILITY_WRONG_WEAPON,
  SOUNDS.ABILITY_TARGET_NOT_PVP_FLAGGED,
  SOUNDS.ABILITY_CASTER_PACIFIED,
  SOUNDS.ABILITY_CASTER_LEVITATED,
  SOUNDS.ABILITY_WEAPON_SWAP_FAIL,
  SOUNDS.ABILITY_INVALID_JUSTICE_TARGET,
]
const IS_IGNORED_SOUND_ID: Record<string, boolean> = {}
for (let i = 0; i < IGNORED_SOUND_IDS.length; i++) {
  const soundId = IGNORED_SOUND_IDS[i]
  if (soundId !== undefined) IS_IGNORED_SOUND_ID[soundId] = true
}

function logAlertMessage(
  this: void,
  category: unknown,
  soundId: unknown,
  message?: string,
  ...args: unknown[]
): undefined {
  const ignored = typeof soundId === "string" && IS_IGNORED_SOUND_ID[soundId] === true
  if (category !== UI_ALERT_CATEGORY_ERROR || message === undefined || ignored) {
    return
  }
  const formatted = zo_strformat(message, ...args)
  if (formatted === "") return

  let stacktrace: string | undefined
  if (INTERNAL.settings.logTraces) {
    stacktrace = debug.traceback()
  }

  INTERNAL.LogRaw(INTERNAL.LOG_LEVEL_WARNING, INTERNAL.TAG_INGAME, formatted, stacktrace)
}

function runStartupLogging(this: void): undefined {
  if (GetAPIVersion() < 101049) {
    GAMEPAD_TYPE[GAMEPAD_TYPE_PS4_NO_TOUCHPAD] = "ps4 gamepad (no touchpad)"
  } else {
    GAMEPAD_TYPE[GAMEPAD_TYPE_DEPRECATED] = "deprecated"
  }

  NUM_ADDONS = AddOnManager.GetNumAddOns()
  for (let i = 1; i <= NUM_ADDONS; i++) {
    const [name, , , , enabled, state] = AddOnManager.GetAddOnInfo(i)
    const version = AddOnManager.GetAddOnVersion(i)
    const directory = AddOnManager.GetAddOnRootDirectoryPath(i)
    if (enabled) {
      if (state === ADDON_STATE_ENABLED) {
        ADD_ON_INFO[name] = string.format(
          "Addon loaded: %s, AddOnVersion: %d, directory: '%s'",
          name,
          version,
          directory
        )
      } else {
        let stateString = STATE_STRING[state] ?? string.format(UNKNOWN_STATE_STRING, state)
        if (state === ADDON_STATE_DEPENDENCIES_DISABLED) {
          stateString = stateString + getMissingDependencyInfo(i)
        }
        SKIPPED_ADD_ON_INFO[name] = string.format(
          "Did not load addon: %s, AddOnVersion: %d, directory: '%s', state: %s",
          name,
          version,
          directory,
          stateString
        )
      }
      NUM_ENABLED_ADDONS = NUM_ENABLED_ADDONS + 1
    }
  }

  let [success, debugInfo] = pcall(generateDebugInfo)
  if (!success) {
    logErrorMessage(debugInfo)
    debugInfo = ""
  }
  INTERNAL.Log(INTERNAL.LOG_LEVEL_INFO, LDL_LOGGER_CONFIG, "Initializing..." + debugInfo)
  logPerformance("init")
}

export function initStartup(): undefined {
  INTERNAL.logPerformance = logPerformance

  pcall(runStartupLogging)

  EVENT_MANAGER.RegisterForEvent(
    LIB.id,
    EVENT_LUA_ERROR,
    function (this: void, _eventCode: number, errorString: string, errorCode: number): undefined {
      const timeSyncCodes = INTERNAL.TIME_SYNC_ERROR_CODE
      if (
        errorString !== undefined &&
        (timeSyncCodes === undefined || timeSyncCodes[errorCode] !== true)
      ) {
        let finalErrorString = errorString
        const tlcStacktrace = INTERNAL.tlcStacktrace
        if (tlcStacktrace !== undefined) {
          const [nameCapture] = string.match(
            errorString,
            "TopLevelControl (.*) cannot be parented to any control but GuiRoot."
          )
          const name = parseLuaCapture(nameCapture)
          if (name !== undefined && tlcStacktrace[name] !== undefined) {
            finalErrorString = errorString + "\n" + tlcStacktrace[name]
            tlcStacktrace[name] = undefined
          }
        }
        logErrorMessage(finalErrorString, errorCode)
      }
      return undefined
    }
  )

  ZO_PreHook(CHAT_ROUTER, "AddDebugMessage", asPreHookFn(logChatMessage))

  ZO_PreHook("ZO_Alert", asPreHookFn(logAlertMessage))
  ZO_PreHook("ZO_AlertNoSuppression", asPreHookFn(logAlertMessage))

  let regularLoadingScreen = false
  EVENT_MANAGER.RegisterForEvent(
    LIB.id,
    EVENT_PLAYER_ACTIVATED,
    function (this: void, _event: number, initial: boolean): undefined {
      let isInitial = initial
      if (regularLoadingScreen) {
        isInitial = false
      } else {
        for (const [name] of pairs(ADD_ON_INFO)) {
          INTERNAL.Log(
            INTERNAL.LOG_LEVEL_WARNING,
            LDL_LOGGER_CONFIG,
            "No loaded event detected for %s",
            name
          )
        }
        for (const [, message] of pairs(SKIPPED_ADD_ON_INFO)) {
          INTERNAL.Log(INTERNAL.LOG_LEVEL_WARNING, LDL_LOGGER_CONFIG, message)
        }
      }

      const now = INTERNAL.SESSION_START_TIME + GetGameTimeMilliseconds()
      let duration: number
      if (isInitial) {
        duration = now - INTERNAL.UI_LOAD_START_TIME
      } else {
        duration = now - INTERNAL.settings.loadScreenStartTime
      }
      const name = isInitial ? "Initial loading" : "Loading"
      const prefix = isInitial ? "approximate " : ""
      const level = regularLoadingScreen ? INTERNAL.LOG_LEVEL_DEBUG : INTERNAL.LOG_LEVEL_INFO
      INTERNAL.Log(
        level,
        LDL_LOGGER_CONFIG,
        string.format("%s screen ended (%sduration: %.3fs)", name, prefix, duration / 1000)
      )
      logPerformance("loadscreen", "end")

      regularLoadingScreen = true
      return undefined
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    LIB.id,
    EVENT_PLAYER_DEACTIVATED,
    function (this: void): undefined {
      INTERNAL.settings.loadScreenStartTime =
        INTERNAL.SESSION_START_TIME + GetGameTimeMilliseconds()
      INTERNAL.Log(INTERNAL.LOG_LEVEL_DEBUG, LDL_LOGGER_CONFIG, "Loading screen started")
      logPerformance("loadscreen", "start")
      return undefined
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    LIB.id,
    EVENT_ADD_ON_LOADED,
    function (this: void, _event: number, name: string): undefined {
      INTERNAL.Log(
        INTERNAL.LOG_LEVEL_INFO,
        LDL_LOGGER_CONFIG,
        ADD_ON_INFO[name] ?? string.format("UI module loaded: %s", name)
      )
      ADD_ON_INFO[name] = undefined

      if (name === LIB.id) {
        INTERNAL.InitializeSettings()
        INTERNAL.InitializeLog()

        if (rawget(ZO_Object, "__call") !== undefined) {
          INTERNAL.Log(
            INTERNAL.LOG_LEVEL_WARNING,
            LDL_LOGGER_CONFIG,
            "ZO_Object has been modified with a __call metamethod"
          )
        }
        if (rawget(ZO_InitializingObject, "__call") !== undefined) {
          INTERNAL.Log(
            INTERNAL.LOG_LEVEL_WARNING,
            LDL_LOGGER_CONFIG,
            "ZO_InitializingObject has been modified with a __call metamethod"
          )
        }

        INTERNAL.Log(INTERNAL.LOG_LEVEL_INFO, LDL_LOGGER_CONFIG, "Initialization complete")
      }

      logPerformance("addon", name)
      return undefined
    }
  )
}
