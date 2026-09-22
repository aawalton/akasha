import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export type ClassRegistry = Record<string, unknown>

export interface CallbackObject {
  FireCallbacks: (this: CallbackObject, ...args: unknown[]) => void
  RegisterCallback: (this: CallbackObject, ...args: unknown[]) => void
  UnregisterCallback: (this: CallbackObject, ...args: unknown[]) => void
}

export interface Logger {
  Verbose: (this: Logger, ...args: unknown[]) => void
  Debug: (this: Logger, ...args: unknown[]) => void
  Info: (this: Logger, ...args: unknown[]) => void
  Warn: (this: Logger, ...args: unknown[]) => void
  Error: (this: Logger, ...args: unknown[]) => void
}

export type GradientPair = readonly [unknown, unknown]

export interface HistoryInternal {
  callbackObject: CallbackObject
  callback: Record<string, string>
  class: ClassRegistry
  logger: Logger
  UI_LOAD_TIME: number
  WORLD_NAME: string
  REQUEST_MODE_AUTO: string
  REQUEST_MODE_OFF: string
  REQUEST_MODE_ON: string
  ZOOM_MODE_AUTO: string
  ZOOM_MODE_FULL_RANGE: string
  ZOOM_MODE_MISSING_RANGE: string
  STOP_REASON_MANUAL_STOP: string
  STOP_REASON_LAST_CACHED_EVENT_REACHED: string
  STOP_REASON_ITERATION_COMPLETED: string
  STOP_REASON_MANAGED_RANGE_LOST: string
  LEGACY_EVENT_ID_OFFSET?: number
  GRADIENT_GUILD_COMPLETED?: GradientPair
  GRADIENT_GUILD_INCOMPLETE?: GradientPair
  GRADIENT_GUILD_PROCESSING?: GradientPair
  GRADIENT_GUILD_REQUESTING?: GradientPair

  initialized?: boolean
  nextTaskId?: number
  historyAdapter?: unknown
  historyCache?: unknown
  statusWindow?: unknown
  statusTooltip?: unknown
  linkedIcon?: unknown

  RegisterForEvent: (this: void, event: number, callback: (...args: never[]) => void) => string
  UnregisterForEvent: (this: void, namespace: string, event: number) => boolean
  RegisterForUpdate: (this: void, interval: number, callback: (...args: never[]) => void) => string
  UnregisterForUpdate: (this: void, namespace: string) => boolean

  ConvertEventToLegacyFormat?: (this: void, event: unknown) => LuaMultiReturn<unknown[]> | undefined
  ConvertLegacyId64ToEventId?: (this: void, id64: string) => number | undefined
  GetCachesForLegacyCategory?: (this: void, guildId: number, category: number) => unknown[]
  GetCategoriesForLegacyCategory?: (this: void, category: number) => unknown[]
  OpenSettingsPanel?: (this: void) => void
  ShowClearCacheDialog?: (this: void, ...args: unknown[]) => void
  ShowResetManagedRangeDialog?: (this: void, ...args: unknown[]) => void

  FireCallbacks: (this: HistoryInternal, ...args: unknown[]) => void
  RegisterCallback: (this: HistoryInternal, ...args: unknown[]) => void
  UnregisterCallback: (this: HistoryInternal, ...args: unknown[]) => void
  Initialize: (this: HistoryInternal) => void
  InitializeCaches: (this: HistoryInternal) => void
  InitializeDialogs: (this: HistoryInternal) => void
  InitializeQuickNavigation: (this: HistoryInternal) => void
  InitializeSaveData: (this: HistoryInternal) => void
  InitializeSettingsMenu: (this: HistoryInternal) => void
  CreateAsyncTask: (this: HistoryInternal) => unknown
  IsGuildStatusVisible: (this: HistoryInternal, guildId: number) => boolean
  IsGuildHistorySystemDisabled: (this: HistoryInternal) => boolean
}

export interface HistoryHandle {
  internal: HistoryInternal
  callback?: Record<string, string>
  StopReason?: Record<string, string>
  IsReady: (this: HistoryHandle) => boolean
  OnReady: (this: HistoryHandle, callback: (lib: HistoryHandle) => void) => void
  IsGuildHistorySystemDisabled: (this: HistoryHandle) => boolean
  RegisterCallback: (this: HistoryHandle, ...args: unknown[]) => void
  UnregisterCallback: (this: HistoryHandle, ...args: unknown[]) => void
  CreateGuildHistoryListener: (this: HistoryHandle, guildId: number, category: number) => unknown
  CreateGuildHistoryProcessor: (
    this: HistoryHandle,
    guildId: number,
    category: number,
    addonName: string
  ) => unknown
  ConvertArtificialLegacyId64ToEventId: (this: HistoryHandle, id64: string) => number | undefined
}
