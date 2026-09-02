export type LogEntry = [
  number,
  string,
  number,
  string,
  string,
  string | readonly string[],
  (string | readonly string[])?,
  number?,
]

export interface Settings {
  version: number
  logTraces: boolean
  minLogLevel: string
  loadScreenStartTime: number
  [key: string]: unknown
}

export interface LoggerConfig {
  tag: string
  minLevelOverride?: string
  logTracesOverride?: boolean
}

export interface LoggerInstance extends LoggerConfig {
  enabled: boolean
  originalTag: string
  Initialize: (this: LoggerInstance, tag: string) => void
  Create: (this: LoggerInstance, tag: string) => LoggerInstance
  SetSubTag: (this: LoggerInstance, tag?: string) => void
  SetEnabled: (this: LoggerInstance, enabled: boolean) => void
  SetMinLevelOverride: (this: LoggerInstance, level?: string) => void
  SetLogTracesOverride: (this: LoggerInstance, enabled?: boolean) => void
  Log: (this: LoggerInstance, level: string, ...args: unknown[]) => void
  Verbose: (this: LoggerInstance, ...args: unknown[]) => void
  Debug: (this: LoggerInstance, ...args: unknown[]) => void
  Info: (this: LoggerInstance, ...args: unknown[]) => void
  Warn: (this: LoggerInstance, ...args: unknown[]) => void
  Error: (this: LoggerInstance, ...args: unknown[]) => void
}

export interface LoggerClass {
  New: (this: LoggerClass, tag: string) => LoggerInstance
  Initialize: (this: LoggerInstance, tag: string) => void
  Create: (this: LoggerInstance, tag: string) => LoggerInstance
  SetSubTag: (this: LoggerInstance, tag?: string) => void
  SetEnabled: (this: LoggerInstance, enabled: boolean) => void
  SetMinLevelOverride: (this: LoggerInstance, level?: string) => void
  SetLogTracesOverride: (this: LoggerInstance, enabled?: boolean) => void
  Log: (this: LoggerInstance, level: string, ...args: unknown[]) => void
  Verbose: (this: LoggerInstance, ...args: unknown[]) => void
  Debug: (this: LoggerInstance, ...args: unknown[]) => void
  Info: (this: LoggerInstance, ...args: unknown[]) => void
  Warn: (this: LoggerInstance, ...args: unknown[]) => void
  Error: (this: LoggerInstance, ...args: unknown[]) => void
}

export interface InternalState {
  class: { Logger?: LoggerClass }
  log: LogEntry[]
  verboseWhitelist: Record<string, boolean>
  callbackObject: ZoCallbackObjectInstance
  FireCallbacks: (this: InternalState, eventName: string, ...args: unknown[]) => void
  UI_LOAD_START_TIME: number
  SESSION_START_TIME: number

  TAG_INGAME: string
  LOG_LEVEL_VERBOSE: string
  LOG_LEVEL_DEBUG: string
  LOG_LEVEL_INFO: string
  LOG_LEVEL_WARNING: string
  LOG_LEVEL_ERROR: string
  NUM_MAX_ENTRIES: number
  LOG_PRUNE_THRESHOLD: number
  MAX_ENTRY_AGE: number
  MAX_SAVE_DATA_LENGTH: number
  ENTRY_TIME_INDEX: number
  ENTRY_FORMATTED_TIME_INDEX: number
  ENTRY_OCCURENCES_INDEX: number
  ENTRY_LEVEL_INDEX: number
  ENTRY_TAG_INDEX: number
  ENTRY_MESSAGE_INDEX: number
  ENTRY_STACK_INDEX: number
  ENTRY_ERROR_CODE_INDEX: number
  LOG_LEVELS: readonly string[]
  LOG_LEVEL_TO_NUMBER: Record<string, number>
  LOG_LEVEL_TO_STRING: Record<string, string>
  STR_TO_LOG_LEVEL: Record<string, string>

  defaultSettings: Settings
  settings: Settings

  formatTime: (this: void, timestamp: number) => string
  Log: (this: void, level: string, config: LoggerConfig, ...args: unknown[]) => void
  LogRaw: (
    this: void,
    level: string,
    tag: string,
    message?: string,
    stacktrace?: string,
    errorCode?: number
  ) => void
  logPerformance: (this: void, trigger: string, extra?: string) => void
  InitializeSettings: (this: InternalState) => Settings
  InitializeLog: (this: InternalState) => void

  appendFormattingErrors?: boolean
  blockChatOutput?: boolean
  originStacktrace?: string
  logOriginStacktrace?: boolean
  logPerformanceStats?: boolean
  ignoreSavedVars?: boolean
  tlcStacktrace?: Record<string, string | undefined>
  TIME_SYNC_ERROR_CODE?: Record<number, boolean>
}

export interface CallbackNames {
  LOG_CLEARED?: string
  LOG_PRUNED?: string
  LOG_ADDED?: string
}

export interface Lib {
  id: string
  internal: InternalState
  callback: CallbackNames

  GetAPIVersion: (this: void) => number
  DEFAULT_SETTINGS: Settings
  TAG_INGAME: string
  LOG_LEVEL_VERBOSE: string
  LOG_LEVEL_DEBUG: string
  LOG_LEVEL_INFO: string
  LOG_LEVEL_WARNING: string
  LOG_LEVEL_ERROR: string
  LOG_LEVELS: readonly string[]
  LOG_LEVEL_TO_STRING: Record<string, string>
  STR_TO_LOG_LEVEL: Record<string, string>
  ENTRY_TIME_INDEX: number
  ENTRY_FORMATTED_TIME_INDEX: number
  ENTRY_OCCURENCES_INDEX: number
  ENTRY_LEVEL_INDEX: number
  ENTRY_TAG_INDEX: number
  ENTRY_MESSAGE_INDEX: number
  ENTRY_STACK_INDEX: number
  ENTRY_ERROR_CODE_INDEX: number
  SESSION_START_TIME: number
  UI_LOAD_START_TIME: number
  Create: (this: void, selfOrTag?: unknown, tag?: unknown) => LoggerInstance
  IsTraceLoggingEnabled: (this: Lib) => boolean
  SetTraceLoggingEnabled: (this: Lib, enabled: boolean) => void
  GetMinLogLevel: (this: Lib) => string
  SetMinLogLevel: (this: Lib, level: string) => void
  GetLog: (this: Lib) => LogEntry[]
  ToggleFormattingErrors: (this: Lib) => boolean
  ClearLog: (this: Lib) => LogEntry[]
  SetBlockChatOutputEnabled: (this: Lib, enabled: boolean) => void
  IsBlockChatOutputEnabled: (this: Lib) => boolean
  CombineSplitStringIfNeeded: (this: void, input: unknown) => string
  RegisterCallback: (
    this: Lib,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => void

  CALLBACK_LOG_CLEARED: string
  CALLBACK_LOG_PRUNED: string
  CALLBACK_LOG_ADDED: string
  GetSessionStartTime: (this: Lib) => number
  GetUiLoadStartTime: (this: Lib) => number
}
