import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"

export type SavedVarsTable = Record<string, unknown>

export interface SavedVarsInfo {
  name?: string
  keyType?: number
  version?: number
  defaults?: SavedVarsTable
  trimDefaults?: SavedVarsTable
  namespace?: string
  profile?: string
  displayName?: string
  characterName?: string
  characterId?: number | string
  table?: SavedVarsTable
  rawSavedVarsTable?: SavedVarsTable
  rawSavedVarsTableParent?: SavedVarsTable
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
  defaults: SavedVarsTable
  trimDefaults: SavedVarsTable
  namespace?: string
  profile?: string
  displayName?: string
  table?: SavedVarsTable
  characterName?: string
  characterId?: number | string
  rawSavedVarsTable?: SavedVarsTable
  rawSavedVarsTableParent?: SavedVarsTable
  rawSavedVarsTableKey?: unknown
  rawSavedVarsTablePath?: unknown[]
  pendingVersion?: number
  isDefaultsTrimmingEnabled?: boolean
  savedVars: SavedVarsTable
  EnableDefaultsTrimming: (this: SavedVarsManagerInstance) => void
  IsProfileWorldName: (this: SavedVarsManagerInstance) => boolean
  FireMigrateStartCallbacks: (this: SavedVarsManagerInstance) => void
  LoadRawTableData: (
    this: SavedVarsManagerInstance
  ) => LuaMultiReturn<
    [SavedVarsTable | undefined, SavedVarsTable | undefined, unknown, unknown[] | undefined]
  >
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
    version: number | SavedVarsTable,
    renameMap?: SavedVarsTable,
    callback?: (this: void, value: unknown) => unknown
  ) => SavedVarsManagerInstance
  RenameSettingsAndInvert: (
    this: SavedVarsManagerInstance,
    version: number,
    renameMap: SavedVarsTable
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
    onVersionUpdate: (this: void, rawDataTable: SavedVarsTable) => void
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
  pinnedAccountKeys?: SavedVarsTable
  iterator?: NextFn
}

export interface DataInstance {
  __dataSource: DataSource
  AddCharacterSettingsToggle: (this: DataInstance, savedVariableTable: string) => DataInstance
  GetLibAddonMenuAccountCheckbox: (this: DataInstance) => SavedVarsTable
  Version: (
    this: DataInstance,
    version: number,
    onVersionUpdate: (this: void, rawDataTable: SavedVarsTable) => void
  ) => DataInstance
  [key: string]: unknown
}

export interface SavedVarsDataClass {
  NewAccountWide: (
    this: SavedVarsDataClass,
    savedVariableTable: string,
    version?: number | string | SavedVarsTable,
    namespace?: string | SavedVarsTable,
    defaults?: SavedVarsTable,
    profile?: string,
    displayName?: string
  ) => DataInstance
  NewCharacterSettings: (
    this: SavedVarsDataClass,
    savedVariableTable: string,
    version?: number | string | SavedVarsTable,
    namespace?: string | SavedVarsTable,
    defaults?: SavedVarsTable,
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

export interface SavedVarsLibTable {
  version: number
  NewAccountWide: (
    this: SavedVarsLibTable,
    savedVariableTable: string,
    version?: unknown,
    namespace?: unknown,
    defaults?: unknown,
    profile?: string,
    displayName?: string
  ) => DataInstance
  ClearSavedVars: (this: SavedVarsLibTable, savedVars: unknown) => void
  DeepSavedVarsCopy: (
    this: SavedVarsLibTable,
    source: unknown,
    destination: unknown,
    doNotOverwrite?: boolean
  ) => void
  GetRawDataTable: (this: SavedVarsLibTable, savedVars: unknown) => SavedVarsTable
  GetWorldNames: (this: SavedVarsLibTable, environment?: string) => string[]
  NewClass: (
    this: SavedVarsLibTable,
    name: string,
    version: number
  ) => LuaMultiReturn<[SavedVarsTable | undefined, ProtectedTable | undefined]>
  [key: string]: unknown
}

export interface ProtectedTable {
  debugMode: boolean
  CreatePath: (
    this: void,
    t: SavedVarsTable,
    path: readonly unknown[]
  ) => LuaMultiReturn<[SavedVarsTable | undefined, SavedVarsTable | undefined, unknown]>
  Debug: (this: void, message: string, force?: boolean, ...args: unknown[]) => void
  SetDebugMode: (this: void, enable: boolean) => void
  GetSavedVarsPath: (
    this: void,
    savedVariableTableName: string | SavedVarsTable,
    namespace: string | undefined,
    profile: string | undefined,
    displayName?: string,
    characterName?: string,
    characterId?: number | string,
    characterKeyType?: number
  ) => LuaMultiReturn<[SavedVarsTable, string, string | undefined, unknown, string | undefined]>
  GetSavedVarsTable: (
    this: void,
    savedVariableTableName: string | SavedVarsTable,
    namespace: string | undefined,
    profile: string | undefined,
    displayName?: string,
    characterName?: string,
    characterId?: number | string,
    characterKeyType?: number
  ) => LuaMultiReturn<
    [SavedVarsTable | undefined, SavedVarsTable | undefined, unknown, SavedVarsTable, unknown[]]
  >
  Invert: (this: void, value: unknown) => boolean
  SearchPath: (
    this: void,
    t: SavedVarsTable,
    path: readonly unknown[]
  ) => LuaMultiReturn<[unknown, SavedVarsTable | undefined, unknown]>
  MaybeSetPath: (
    this: void,
    t: SavedVarsTable,
    value: unknown,
    path: readonly unknown[]
  ) => SavedVarsTable | undefined
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
  UnsetPath: (this: void, t: SavedVarsTable, path: readonly unknown[]) => void
  ValidateSavedVarsTable: (
    this: void,
    savedVariableTable: string | SavedVarsTable
  ) => SavedVarsTable
}

export interface SavedVarsRegistry {
  lib: SavedVarsLibTable
  manager: SavedVarsManagerClass
  data: SavedVarsDataClass
  protected: ProtectedTable
}

export type SavedVarsNewFn = (
  this: void,
  self: ZO_SavedVars,
  savedVariableTable: string,
  version: number,
  namespace: string | undefined,
  defaults: SavedVarsTable,
  profile?: string,
  displayName?: string,
  characterName?: string,
  characterId?: number | string,
  characterKeyType?: number
) => SavedVarsTable

export type SavedVarsAccountWideFn = (
  this: void,
  self: ZO_SavedVars,
  savedVariableTable: string,
  version: number,
  namespace: string | undefined,
  defaults: SavedVarsTable,
  profile?: string,
  displayName?: string
) => SavedVarsTable

export interface SavedVarsWritable {
  New: (
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: SavedVarsTable,
    profile?: string,
    displayName?: string,
    characterName?: string,
    characterId?: number | string,
    characterKeyType?: number
  ) => SavedVarsTable
  NewCharacterNameSettings: (
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: SavedVarsTable,
    profile?: string
  ) => SavedVarsTable
  NewCharacterIdSettings: (
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: SavedVarsTable,
    profile?: string
  ) => SavedVarsTable
  NewAccountWide: (
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: SavedVarsTable,
    profile?: string,
    displayName?: string
  ) => SavedVarsTable
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
