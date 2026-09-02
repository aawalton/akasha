export type LsvTable = Record<string, unknown>

export interface SavedVarsInfo {
  name?: string
  keyType?: number
  version?: number
  defaults?: LsvTable
  trimDefaults?: LsvTable
  namespace?: string
  profile?: string
  displayName?: string
  characterName?: string
  characterId?: number | string
  table?: LsvTable
  rawSavedVarsTable?: LsvTable
  rawSavedVarsTableParent?: LsvTable
  rawSavedVarsTableKey?: unknown
  rawSavedVarsTablePath?: unknown[]
}

export interface AccountAndProfile {
  account: string
  profile?: string
}

export interface RegisteredSavedVarsInfo extends SavedVarsInfo {
  addonName?: string
}

export type NextFn = (
  this: void,
  table: unknown,
  key?: unknown
) => LuaMultiReturn<[unknown, unknown]>

export interface SavedVarsManagerInstance {
  id: number
  name?: string
  keyType: number
  version?: number
  defaults: LsvTable
  trimDefaults: LsvTable
  namespace?: string
  profile?: string
  displayName?: string
  table?: LsvTable
  characterName?: string
  characterId?: number | string
  rawSavedVarsTable?: LsvTable
  rawSavedVarsTableParent?: LsvTable
  rawSavedVarsTableKey?: unknown
  rawSavedVarsTablePath?: unknown[]
  pendingVersion?: number
  isDefaultsTrimmingEnabled?: boolean
  savedVars: LsvTable
  EnableDefaultsTrimming: (this: SavedVarsManagerInstance) => void
  IsProfileWorldName: (this: SavedVarsManagerInstance) => boolean
  FireMigrateStartCallbacks: (this: SavedVarsManagerInstance) => void
  LoadRawTableData: (
    this: SavedVarsManagerInstance
  ) => LuaMultiReturn<[LsvTable | undefined, LsvTable | undefined, unknown, unknown[] | undefined]>
  RegisterLazyLoadCallback: (
    this: SavedVarsManagerInstance,
    callback: (this: void, ...args: never[]) => void,
    param1?: unknown,
    ...rest: unknown[]
  ) => string
  RegisterMigrateStartCallback: (
    this: SavedVarsManagerInstance,
    callback: (this: void, ...args: never[]) => void,
    param1?: unknown,
    ...rest: unknown[]
  ) => void
  SetDebugMode: (this: SavedVarsManagerInstance, enable: boolean) => void
  RemoveSettings: (
    this: SavedVarsManagerInstance,
    version: number,
    settingsToRemove: string | string[],
    ...rest: string[]
  ) => SavedVarsManagerInstance
  RenameSettings: (
    this: SavedVarsManagerInstance,
    version: number | LsvTable,
    renameMap?: LsvTable,
    callback?: (this: void, value: unknown) => unknown
  ) => SavedVarsManagerInstance
  RenameSettingsAndInvert: (
    this: SavedVarsManagerInstance,
    version: number,
    renameMap: LsvTable
  ) => SavedVarsManagerInstance
  UnregisterLazyLoadCallback: (
    this: SavedVarsManagerInstance,
    callback: (this: void, ...args: never[]) => void
  ) => void
  UnregisterMigrateStartCallback: (
    this: SavedVarsManagerInstance,
    callback: (this: void, ...args: never[]) => void
  ) => void
  Validate: (this: SavedVarsManagerInstance) => LuaMultiReturn<[boolean, SavedVarsManagerInstance]>
  Version: (
    this: SavedVarsManagerInstance,
    version: number,
    onVersionUpdate: (this: void, rawDataTable: LsvTable) => void
  ) => SavedVarsManagerInstance
}

export interface SavedVarsManagerClass {
  New: (this: SavedVarsManagerClass, data: SavedVarsInfo) => SavedVarsManagerInstance
  __index: (this: SavedVarsManagerInstance, key: string) => unknown
}

export interface DataSource {
  defaultToAccount: boolean
  account?: SavedVarsManagerInstance
  character?: SavedVarsManagerInstance
  active?: SavedVarsManagerInstance
  pinnedAccountKeys?: LsvTable
  iterator?: NextFn
}

export interface DataInstance {
  __dataSource: DataSource
  [key: string]: unknown
}

export interface LsvDataClass {
  NewAccountWide: (
    this: LsvDataClass,
    savedVariableTable: string,
    version?: number | string | LsvTable,
    namespace?: string | LsvTable,
    defaults?: LsvTable,
    profile?: string,
    displayName?: string
  ) => DataInstance
  NewCharacterSettings: (
    this: LsvDataClass,
    savedVariableTable: string,
    version?: number | string | LsvTable,
    namespace?: string | LsvTable,
    defaults?: LsvTable,
    profile?: string,
    displayName?: string,
    characterName?: string,
    characterId?: number | string,
    characterKeyType?: number
  ) => DataInstance
  __index: (this: DataInstance, key: string) => unknown
  __newindex: (this: DataInstance, key: string, value: unknown) => void
  __pairs?: (this: DataInstance) => LuaMultiReturn<[NextFn, DataInstance, undefined]>
  __ipairs?: (this: DataInstance) => LuaIterable<LuaMultiReturn<[number, unknown]>> | undefined
}

export interface LibSavedVarsTable {
  version: number
  ClearSavedVars: (this: LibSavedVarsTable, savedVars: unknown) => void
  DeepSavedVarsCopy: (
    this: LibSavedVarsTable,
    source: unknown,
    destination: unknown,
    doNotOverwrite?: boolean
  ) => void
  GetRawDataTable: (this: LibSavedVarsTable, savedVars: unknown) => LsvTable
  GetWorldNames: (this: LibSavedVarsTable, environment?: string) => string[]
  NewClass: (
    this: LibSavedVarsTable,
    name: string,
    version: number
  ) => LuaMultiReturn<[LsvTable | undefined, ProtectedTable | undefined]>
  [key: string]: unknown
}

export interface ProtectedTable {
  debugMode: boolean
  CreatePath: (
    this: void,
    t: LsvTable,
    path: readonly unknown[]
  ) => LuaMultiReturn<[LsvTable | undefined, LsvTable | undefined, unknown]>
  Debug: (this: void, message: string, force?: boolean, ...args: unknown[]) => void
  SetDebugMode: (this: void, enable: boolean) => void
  GetSavedVarsPath: (
    this: void,
    savedVariableTableName: string | LsvTable,
    namespace: string | undefined,
    profile: string | undefined,
    displayName?: string,
    characterName?: string,
    characterId?: number | string,
    characterKeyType?: number
  ) => LuaMultiReturn<[LsvTable, string, string | undefined, unknown, string | undefined]>
  GetSavedVarsTable: (
    this: void,
    savedVariableTableName: string | LsvTable,
    namespace: string | undefined,
    profile: string | undefined,
    displayName?: string,
    characterName?: string,
    characterId?: number | string,
    characterKeyType?: number
  ) => LuaMultiReturn<[LsvTable | undefined, LsvTable | undefined, unknown, LsvTable, unknown[]]>
  Invert: (this: void, value: unknown) => boolean
  SearchPath: (
    this: void,
    t: LsvTable,
    path: readonly unknown[]
  ) => LuaMultiReturn<[unknown, LsvTable | undefined, unknown]>
  MaybeSetPath: (
    this: void,
    t: LsvTable,
    value: unknown,
    path: readonly unknown[]
  ) => LsvTable | undefined
  Migrate: (
    this: void,
    defaultKeyType: number | SavedVarsInfo | undefined,
    fromSavedVarsInfo: SavedVarsInfo,
    toSavedVarsInfo1?: SavedVarsInfo,
    ...rest: SavedVarsInfo[]
  ) => LuaMultiReturn<[SavedVarsManagerInstance[] | undefined, SavedVarsManagerInstance]>
  MigrateToMegaserverProfiles: (
    this: void,
    defaultKeyType: number | undefined,
    fromSavedVarsInfo: SavedVarsInfo,
    copyToAllServers: boolean | undefined,
    toSavedVarsInfo: SavedVarsInfo | undefined
  ) => LuaMultiReturn<
    [Record<string, SavedVarsManagerInstance> | undefined, SavedVarsManagerInstance]
  >
  UnsetPath: (this: void, t: LsvTable, path: readonly unknown[]) => void
  ValidateSavedVarsTable: (this: void, savedVariableTable: string | LsvTable) => LsvTable
}

export interface LsvRegistry {
  lib: LibSavedVarsTable
  manager: SavedVarsManagerClass
  data: LsvDataClass
  protected: ProtectedTable
}

export type SavedVarsNewFn = (
  this: void,
  self: ZO_SavedVars,
  savedVariableTable: string,
  version: number,
  namespace: string | undefined,
  defaults: LsvTable,
  profile?: string,
  displayName?: string,
  characterName?: string,
  characterId?: number | string,
  characterKeyType?: number
) => LsvTable

export type SavedVarsAccountWideFn = (
  this: void,
  self: ZO_SavedVars,
  savedVariableTable: string,
  version: number,
  namespace: string | undefined,
  defaults: LsvTable,
  profile?: string,
  displayName?: string
) => LsvTable

export interface SavedVarsWritable {
  New: (
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: LsvTable,
    profile?: string,
    displayName?: string,
    characterName?: string,
    characterId?: number | string,
    characterKeyType?: number
  ) => LsvTable
  NewCharacterNameSettings: (
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: LsvTable,
    profile?: string
  ) => LsvTable
  NewCharacterIdSettings: (
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: LsvTable,
    profile?: string
  ) => LsvTable
  NewAccountWide: (
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: LsvTable,
    profile?: string,
    displayName?: string
  ) => LsvTable
}

export interface CallbackManagerExt {
  FireCallbacks: (this: void, callbackName: string, ...args: unknown[]) => void
  RegisterCallback: (
    this: void,
    callbackName: string,
    callback: (this: void, ...args: never[]) => void,
    param1?: unknown
  ) => void
  UnregisterCallback: (
    this: void,
    callbackName: string,
    callback?: (this: void, ...args: never[]) => void
  ) => void
  UnregisterAllCallbacks: (this: void, callbackName: string) => void
}
