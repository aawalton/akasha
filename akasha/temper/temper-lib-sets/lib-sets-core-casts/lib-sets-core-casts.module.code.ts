export type LibSlots = { [slot: string]: unknown }
export function asLibSlots(value: unknown): LibSlots {
  return value as LibSlots
}

export type LibSlotFns = { [slot: string]: ((this: void, ...args: unknown[]) => void) | undefined }
export function asLibSlotFns(value: unknown): LibSlotFns {
  return value as LibSlotFns
}

export type LibSlotVoidFns = { [slot: string]: ((this: void) => void) | undefined }
export function asLibSlotVoidFns(value: unknown): LibSlotVoidFns {
  return value as LibSlotVoidFns
}

export type LibSlotGpFns = { [slot: string]: ((this: void, gp?: boolean) => void) | undefined }
export function asLibSlotGpFns(value: unknown): LibSlotGpFns {
  return value as LibSlotGpFns
}

export type LibCmdFns = { [name: string]: ((this: void, command: string) => void) | undefined }
export function asLibCmdFns(value: unknown): LibCmdFns {
  return value as LibCmdFns
}

export type LibDispatchFns = {
  [name: string]: ((this: void, ...args: unknown[]) => void) | undefined
}
export function asLibDispatchFns(value: unknown): LibDispatchFns {
  return value as LibDispatchFns
}

export type LibSetIdSlots = { [k: string]: SetIdTable | undefined }
export function asLibSetIdSlots(value: unknown): LibSetIdSlots {
  return value as LibSetIdSlots
}

export type SafeReturnApiTableFn = (this: void, tabData: unknown) => unknown
export function asSafeReturnApiTableFn(value: unknown): SafeReturnApiTableFn {
  return value as SafeReturnApiTableFn
}

export type ToBooleanFn = (this: void, value: unknown) => unknown
export function asToBooleanFn(value: unknown): ToBooleanFn {
  return value as ToBooleanFn
}

export type RemoveLanguagesFn = (this: void, langTable: { [lang: string]: unknown }) => unknown
export function asRemoveLanguagesFn(value: unknown): RemoveLanguagesFn {
  return value as RemoveLanguagesFn
}

export type IsPerfectedSetIdFn = (this: void, setId: number) => boolean
export function asIsPerfectedSetIdFn(value: unknown): IsPerfectedSetIdFn {
  return value as IsPerfectedSetIdFn
}

export type GetPerfectedSetDataFn = (this: void, setId: number) => { [k: string]: unknown }
export function asGetPerfectedSetDataFn(value: unknown): GetPerfectedSetDataFn {
  return value as GetPerfectedSetDataFn
}

export type VoidFn = (this: void) => void
export function asVoidFn(value: unknown): VoidFn {
  return value as VoidFn
}

export type CheckSetFn = (
  this: void,
  itemLink: string | undefined
) => LuaMultiReturn<[boolean, ...unknown[]]>
export function asCheckSetFn(value: unknown): CheckSetFn {
  return value as CheckSetFn
}

export type CheckNoSetIdSetFn = (
  this: void,
  itemId: number | undefined
) => LuaMultiReturn<[boolean, ...unknown[]]>
export function asCheckNoSetIdSetFn(value: unknown): CheckNoSetIdSetFn {
  return value as CheckNoSetIdSetFn
}

export type GetSetEquippedInfoFn = (
  this: void,
  itemId: number | undefined
) => LuaMultiReturn<[boolean, ...unknown[]]>
export function asGetSetEquippedInfoFn(value: unknown): GetSetEquippedInfoFn {
  return value as GetSetEquippedInfoFn
}

export type GetSetsOfClassIdFn = (this: void, classId: number) => { [setId: number]: unknown }
export function asGetSetsOfClassIdFn(value: unknown): GetSetsOfClassIdFn {
  return value as GetSetsOfClassIdFn
}

export type IsNoEsoSetFn = (this: void, setId: number) => boolean
export function asIsNoEsoSetFn(value: unknown): IsNoEsoSetFn {
  return value as IsNoEsoSetFn
}

export type SetIdToStrRecord = { [setId: number]: { [k: string]: unknown } }
export function asSetIdToStrRecord(value: unknown): SetIdToStrRecord {
  return value as SetIdToStrRecord
}

export type SetIdTable = { [setId: number]: unknown }
export function asSetIdTable(value: unknown): SetIdTable {
  return value as SetIdTable
}

export type SetIdBoolMap = { [setId: number]: boolean }
export function asSetIdBoolMap(value: unknown): SetIdBoolMap {
  return value as SetIdBoolMap
}

export type TypeToSetIdBoolMap = { [typeIndex: number]: { [setId: number]: boolean } }
export function asTypeToSetIdBoolMap(value: unknown): TypeToSetIdBoolMap {
  return value as TypeToSetIdBoolMap
}

export type NumKeyTable = { [k: number]: unknown }
export function asNumKeyTable(value: unknown): NumKeyTable {
  return value as NumKeyTable
}

export type SetIdNumberMap = { [setId: number]: number }
export function asSetIdNumberMap(value: unknown): SetIdNumberMap {
  return value as SetIdNumberMap
}

export type IndexNumberMap = { [idx: number]: number }
export function asIndexNumberMap(value: unknown): IndexNumberMap {
  return value as IndexNumberMap
}

export type IndexNumberMapOpt = IndexNumberMap | undefined
export function asIndexNumberMapOpt(value: unknown): IndexNumberMapOpt {
  return value as IndexNumberMapOpt
}

export type IndexStringMapOpt = { [index: number]: string } | undefined
export function asIndexStringMapOpt(value: unknown): IndexStringMapOpt {
  return value as IndexStringMapOpt
}

export type TypeNameMapOpt = { [typeIndex: number]: string } | undefined
export function asTypeNameMapOpt(value: unknown): TypeNameMapOpt {
  return value as TypeNameMapOpt
}

export type TypeBoolMapOpt = { [typeIndex: number]: boolean } | undefined
export function asTypeBoolMapOpt(value: unknown): TypeBoolMapOpt {
  return value as TypeBoolMapOpt
}

export type CategoryBoolMap = { [category: number]: boolean }
export function asCategoryBoolMap(value: unknown): CategoryBoolMap {
  return value as CategoryBoolMap
}

export type CategoryNumberMap = { [category: number]: number }
export function asCategoryNumberMap(value: unknown): CategoryNumberMap {
  return value as CategoryNumberMap
}

export type ItemIdNumberMap = { [itemId: number]: number }
export function asItemIdNumberMap(value: unknown): ItemIdNumberMap {
  return value as ItemIdNumberMap
}

export type ItemIdNumberMapOpt = ItemIdNumberMap | undefined
export function asItemIdNumberMapOpt(value: unknown): ItemIdNumberMapOpt {
  return value as ItemIdNumberMapOpt
}

export type FactionNumberMap = { [factionIndex: number]: number }
export function asFactionNumberMap(value: unknown): FactionNumberMap {
  return value as FactionNumberMap
}

export type StrRecord = { [key: string]: unknown }
export function asStrRecord(value: unknown): StrRecord {
  return value as StrRecord
}

export type StrRecordOpt = StrRecord | undefined
export function asStrRecordOpt(value: unknown): StrRecordOpt {
  return value as StrRecordOpt
}

export type LangRecord = { [lang: string]: unknown }
export function asLangRecord(value: unknown): LangRecord {
  return value as LangRecord
}

export type LangRecordOpt = LangRecord | undefined
export function asLangRecordOpt(value: unknown): LangRecordOpt {
  return value as LangRecordOpt
}

export type LangStringMapOpt = { [lang: string]: string | undefined } | undefined
export function asLangStringMapOpt(value: unknown): LangStringMapOpt {
  return value as LangStringMapOpt
}

export type FavoritesRecordOpt = { [k: string | number]: unknown } | undefined
export function asFavoritesRecordOpt(value: unknown): FavoritesRecordOpt {
  return value as FavoritesRecordOpt
}

export type CategoryRecord = { [category: string]: unknown }
export function asCategoryRecord(value: unknown): CategoryRecord {
  return value as CategoryRecord
}

export type SetIdLangStringMap = { [setId: number]: { [lang: string]: string } }
export function asSetIdLangStringMap(value: unknown): SetIdLangStringMap {
  return value as SetIdLangStringMap
}

export type SetIdItemIdMap = { [setId: number]: { [itemId: number]: number } }
export function asSetIdItemIdMap(value: unknown): SetIdItemIdMap {
  return value as SetIdItemIdMap
}

export type SetIdCompressedItemIds = { [setId: number]: (number | string)[] }
export function asSetIdCompressedItemIds(value: unknown): SetIdCompressedItemIds {
  return value as SetIdCompressedItemIds
}

export type StrRecordEntryOpt = { [k: string]: unknown } | undefined
export function asStrRecordEntryOpt(value: unknown): StrRecordEntryOpt {
  return value as StrRecordEntryOpt
}

export type StringOrNumber = string | number
export function asStringOrNumber(value: unknown): StringOrNumber {
  return value as StringOrNumber
}
