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

export interface LibHistoireInternal {
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

  FireCallbacks: (this: LibHistoireInternal, ...args: unknown[]) => void
  RegisterCallback: (this: LibHistoireInternal, ...args: unknown[]) => void
  UnregisterCallback: (this: LibHistoireInternal, ...args: unknown[]) => void
  Initialize: (this: LibHistoireInternal) => void
  InitializeCaches: (this: LibHistoireInternal) => void
  InitializeChatMessage: (this: LibHistoireInternal) => void
  InitializeDialogs: (this: LibHistoireInternal) => void
  InitializeQuickNavigation: (this: LibHistoireInternal) => void
  InitializeSaveData: (this: LibHistoireInternal) => void
  InitializeSettingsMenu: (this: LibHistoireInternal) => void
  CreateAsyncTask: (this: LibHistoireInternal) => unknown
  IsGuildStatusVisible: (this: LibHistoireInternal, guildId: number) => boolean
  IsGuildHistorySystemDisabled: (this: LibHistoireInternal) => boolean
}

export interface LibHistoireGlobal {
  internal: LibHistoireInternal
  callback?: Record<string, string>
  StopReason?: Record<string, string>
  IsReady: (this: LibHistoireGlobal) => boolean
  OnReady: (this: LibHistoireGlobal, callback: (lib: LibHistoireGlobal) => void) => void
  IsGuildHistorySystemDisabled: (this: LibHistoireGlobal) => boolean
  RegisterCallback: (this: LibHistoireGlobal, ...args: unknown[]) => void
  UnregisterCallback: (this: LibHistoireGlobal, ...args: unknown[]) => void
  CreateGuildHistoryListener: (
    this: LibHistoireGlobal,
    guildId: number,
    category: number
  ) => unknown
  CreateGuildHistoryProcessor: (
    this: LibHistoireGlobal,
    guildId: number,
    category: number,
    addonName: string
  ) => unknown
  ConvertArtificialLegacyId64ToEventId: (
    this: LibHistoireGlobal,
    id64: string
  ) => number | undefined
}
