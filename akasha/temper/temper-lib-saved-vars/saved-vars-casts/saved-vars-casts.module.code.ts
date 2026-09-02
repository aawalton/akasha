import type {
  CallbackManagerExt,
  DataInstance,
  DataSource,
  LibSavedVarsTable,
  LsvDataClass,
  LsvRegistry,
  LsvTable,
  NextFn,
  ProtectedTable,
  SavedVarsAccountWideFn,
  SavedVarsInfo,
  SavedVarsManagerClass,
  SavedVarsManagerInstance,
  SavedVarsNewFn,
  SavedVarsWritable,
} from "../saved-vars-types/saved-vars-types.module.code.ts"

export type Indexable = Record<string, unknown>

type GlobalTable = Indexable
type Protected = ProtectedTable
type ManagerClass = SavedVarsManagerClass
type ManagerInstance = SavedVarsManagerInstance
type DataClass = LsvDataClass
type Table = LsvTable
type ZoSavedVars = ZO_SavedVars
type UnknownArray = unknown[]
type ConcatList = (string | number)[]
type StringArray = string[]
type SettingsList = string[]

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asIndexable(value: unknown): Indexable {
  return value as Indexable
}

export function asLsvTable(value: unknown): LsvTable {
  return value as LsvTable
}

export function asLsvRegistry(value: unknown): LsvRegistry {
  return value as LsvRegistry
}

export function asLibSavedVarsTable(value: unknown): LibSavedVarsTable {
  return value as LibSavedVarsTable
}

export function asProtected(value: unknown): Protected {
  return value as Protected
}

export function asManagerClass(value: unknown): ManagerClass {
  return value as ManagerClass
}

export function asManagerInstance(value: unknown): ManagerInstance {
  return value as ManagerInstance
}

export function asDataClass(value: unknown): DataClass {
  return value as DataClass
}

export function asDataInstance(value: unknown): DataInstance {
  return value as DataInstance
}

export function asDataSource(value: unknown): DataSource {
  return value as DataSource
}

export function asSavedVarsInfo(value: unknown): SavedVarsInfo {
  return value as SavedVarsInfo
}

export function asNextFn(value: unknown): NextFn {
  return value as NextFn
}

export function asCallbackManagerExt(value: unknown): CallbackManagerExt {
  return value as CallbackManagerExt
}

export function asSavedVarsWritable(value: unknown): SavedVarsWritable {
  return value as SavedVarsWritable
}

export function asSavedVarsNewFn(value: unknown): SavedVarsNewFn {
  return value as SavedVarsNewFn
}

export function asSavedVarsAccountWideFn(value: unknown): SavedVarsAccountWideFn {
  return value as SavedVarsAccountWideFn
}

export function asString(value: unknown): string {
  return value as string
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asUnknownArray(value: unknown): UnknownArray {
  return value as UnknownArray
}

export function asConcatList(value: unknown): ConcatList {
  return value as ConcatList
}

export function asTable(value: unknown): Table {
  return value as Table
}

export function asStringArray(value: unknown): StringArray {
  return value as StringArray
}

export function asZoSavedVars(value: unknown): ZoSavedVars {
  return value as ZoSavedVars
}

export type VersionUpdateFn = (this: void, rawDataTable: LsvTable) => void
export function asVersionUpdateFn(value: unknown): VersionUpdateFn {
  return value as VersionUpdateFn
}

export type RenameCallbackFn = (this: void, value: unknown) => unknown
type RenameCallback = RenameCallbackFn
export function asRenameCallback(value: unknown): RenameCallback {
  return value as RenameCallback
}

export function asSettingsList(value: unknown): SettingsList {
  return value as SettingsList
}

export type RawIpairsFn = (
  this: void,
  t: readonly unknown[]
) => LuaIterable<LuaMultiReturn<[number, unknown]>>
type RawIpairs = RawIpairsFn
export function asRawIpairs(value: unknown): RawIpairs {
  return value as RawIpairs
}
