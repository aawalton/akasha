import {
  ENTRY_ERROR_CODE_INDEX,
  ENTRY_FORMATTED_TIME_INDEX,
  ENTRY_LEVEL_INDEX,
  ENTRY_MESSAGE_INDEX,
  ENTRY_OCCURENCES_INDEX,
  ENTRY_STACK_INDEX,
  ENTRY_TAG_INDEX,
  ENTRY_TIME_INDEX,
  LIB_IDENTIFIER,
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_ERROR,
  LOG_LEVEL_INFO,
  LOG_LEVEL_TO_NUMBER,
  LOG_LEVEL_TO_STRING,
  LOG_LEVEL_VERBOSE,
  LOG_LEVEL_WARNING,
  LOG_LEVELS,
  LOG_PRUNE_THRESHOLD,
  MAX_ENTRY_AGE,
  MAX_SAVE_DATA_LENGTH,
  NUM_MAX_ENTRIES,
  STR_TO_LOG_LEVEL,
  TAG_INGAME,
} from "../debug-logger-constants/debug-logger-constants.module.code.ts"
import type {
  InternalState,
  Lib,
  Settings,
} from "../debug-logger-types/debug-logger-types.module.code.ts"

const UI_LOAD_START_TIME = GetTimeStamp() * 1000
const SESSION_START_TIME = UI_LOAD_START_TIME - GetGameTimeMilliseconds()

const callbackObject = ZO_CallbackObject.New()

const DEFAULT_SETTINGS: Settings = {
  version: 2,
  logTraces: false,
  minLogLevel: LOG_LEVEL_INFO,
  loadScreenStartTime: UI_LOAD_START_TIME,
}

function noopFormatTime(this: void): string {
  return ""
}
function noop(this: void): undefined {}

export const INTERNAL: InternalState = {
  class: {},
  log: [],
  verboseWhitelist: {},
  callbackObject,
  FireCallbacks(this: InternalState, eventName: string, ...args: unknown[]): undefined {
    callbackObject.FireCallbacks(eventName, ...args)
  },
  UI_LOAD_START_TIME,
  SESSION_START_TIME,

  TAG_INGAME,
  LOG_LEVEL_VERBOSE,
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_INFO,
  LOG_LEVEL_WARNING,
  LOG_LEVEL_ERROR,
  NUM_MAX_ENTRIES,
  LOG_PRUNE_THRESHOLD,
  MAX_ENTRY_AGE,
  MAX_SAVE_DATA_LENGTH,
  ENTRY_TIME_INDEX,
  ENTRY_FORMATTED_TIME_INDEX,
  ENTRY_OCCURENCES_INDEX,
  ENTRY_LEVEL_INDEX,
  ENTRY_TAG_INDEX,
  ENTRY_MESSAGE_INDEX,
  ENTRY_STACK_INDEX,
  ENTRY_ERROR_CODE_INDEX,
  LOG_LEVELS,
  LOG_LEVEL_TO_NUMBER,
  LOG_LEVEL_TO_STRING,
  STR_TO_LOG_LEVEL,

  defaultSettings: DEFAULT_SETTINGS,
  settings: ZO_ShallowTableCopy(DEFAULT_SETTINGS),

  formatTime: noopFormatTime,
  Log: noop,
  LogRaw: noop,
  logPerformance: noop,
  InitializeSettings(this: InternalState): Settings {
    return this.settings
  },
  InitializeLog: noop,
}

export const LIB: Lib = {
  id: LIB_IDENTIFIER,
  internal: INTERNAL,
  callback: {},
} as Lib
