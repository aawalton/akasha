import "../debug-logger-declarations/debug-logger-declarations.module.code.ts"

import {
  asConcatList,
  asLoggerTag,
  asString,
} from "../debug-logger-casts/debug-logger-casts.module.code.ts"
import { CALLBACK_LOG_CLEARED } from "../debug-logger-constants/debug-logger-constants.module.code.ts"
import { INTERNAL, lib } from "../debug-logger-state/debug-logger-state.module.code.ts"
import type { Lib, LoggerInstance } from "../debug-logger-types/debug-logger-types.module.code.ts"

export function initApi(): undefined {
  const loggerClass = INTERNAL.class.Logger
  if (loggerClass === undefined) return

  lib.GetAPIVersion = function (this: void): number {
    return 2
  }

  lib.DEFAULT_SETTINGS = INTERNAL.defaultSettings
  lib.TAG_INGAME = INTERNAL.TAG_INGAME

  lib.LOG_LEVEL_VERBOSE = INTERNAL.LOG_LEVEL_VERBOSE
  lib.LOG_LEVEL_DEBUG = INTERNAL.LOG_LEVEL_DEBUG
  lib.LOG_LEVEL_INFO = INTERNAL.LOG_LEVEL_INFO
  lib.LOG_LEVEL_WARNING = INTERNAL.LOG_LEVEL_WARNING
  lib.LOG_LEVEL_ERROR = INTERNAL.LOG_LEVEL_ERROR
  lib.LOG_LEVELS = INTERNAL.LOG_LEVELS
  lib.LOG_LEVEL_TO_STRING = INTERNAL.LOG_LEVEL_TO_STRING
  lib.STR_TO_LOG_LEVEL = INTERNAL.STR_TO_LOG_LEVEL

  lib.ENTRY_TIME_INDEX = INTERNAL.ENTRY_TIME_INDEX
  lib.ENTRY_FORMATTED_TIME_INDEX = INTERNAL.ENTRY_FORMATTED_TIME_INDEX
  lib.ENTRY_OCCURENCES_INDEX = INTERNAL.ENTRY_OCCURENCES_INDEX
  lib.ENTRY_LEVEL_INDEX = INTERNAL.ENTRY_LEVEL_INDEX
  lib.ENTRY_TAG_INDEX = INTERNAL.ENTRY_TAG_INDEX
  lib.ENTRY_MESSAGE_INDEX = INTERNAL.ENTRY_MESSAGE_INDEX
  lib.ENTRY_STACK_INDEX = INTERNAL.ENTRY_STACK_INDEX
  lib.ENTRY_ERROR_CODE_INDEX = INTERNAL.ENTRY_ERROR_CODE_INDEX

  lib.SESSION_START_TIME = INTERNAL.SESSION_START_TIME
  lib.UI_LOAD_START_TIME = INTERNAL.UI_LOAD_START_TIME

  lib.Create = function (this: void, selfOrTag?: unknown, tag?: unknown): LoggerInstance {
    let resolvedTag = tag
    if (selfOrTag !== lib) {
      resolvedTag = selfOrTag
    }
    return loggerClass.New(asLoggerTag(resolvedTag))
  }
  setmetatable(lib, {
    __call(this: Lib, ...args: unknown[]): LoggerInstance {
      return lib.Create(lib, ...args)
    },
  })

  lib.IsTraceLoggingEnabled = function (this: Lib): boolean {
    return INTERNAL.settings.logTraces
  }

  lib.SetTraceLoggingEnabled = function (this: Lib, enabled: boolean): undefined {
    INTERNAL.settings.logTraces = enabled
  }

  lib.GetMinLogLevel = function (this: Lib): string {
    return INTERNAL.settings.minLogLevel
  }

  lib.SetMinLogLevel = function (this: Lib, level: string): undefined {
    INTERNAL.settings.minLogLevel = level
  }

  lib.GetLog = function (this: Lib) {
    return INTERNAL.log
  }

  lib.ToggleFormattingErrors = function (this: Lib): boolean {
    const next = INTERNAL.appendFormattingErrors !== true
    INTERNAL.appendFormattingErrors = next
    return next
  }

  lib.ClearLog = function (this: Lib) {
    INTERNAL.log = []
    LibDebugLoggerLog = INTERNAL.log
    INTERNAL.FireCallbacks(CALLBACK_LOG_CLEARED, INTERNAL.log)
    return INTERNAL.log
  }

  lib.SetBlockChatOutputEnabled = function (this: Lib, enabled: boolean): undefined {
    INTERNAL.blockChatOutput = enabled
  }

  lib.IsBlockChatOutputEnabled = function (this: Lib): boolean {
    return INTERNAL.blockChatOutput === true
  }

  lib.CombineSplitStringIfNeeded = function (this: void, input: unknown): string {
    if (type(input) === "table") {
      return table.concat(asConcatList(input), "")
    }
    return asString(input)
  }

  lib.RegisterCallback = function (
    this: Lib,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ): undefined {
    INTERNAL.callbackObject.RegisterCallback(callbackName, callback)
  }
}
