import "akasha/temper/addon/pages/items/crafting-sets/sets-constant-shapes/sets-constant-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"

type TypeToSetIdsTable = {
  [typeIndex: number]: { [setId: number]: boolean | undefined } | undefined
}
export function asTypeToSetIdsTable(value: unknown): TypeToSetIdsTable {
  return value as TypeToSetIdsTable
}

type SetIdBoolOptMap = { [setId: number]: boolean | undefined }
export function asSetIdBoolOptMap(value: unknown): SetIdBoolOptMap {
  return value as SetIdBoolOptMap
}

type TypeToSetIdNumberMap = { [typeIndex: number]: { [setId: number]: number } }
export function asTypeToSetIdNumberMap(value: unknown): TypeToSetIdNumberMap {
  return value as TypeToSetIdNumberMap
}

type EquipTypeBoolMap = { [equipType: number]: boolean }
export function asEquipTypeBoolMap(value: unknown): EquipTypeBoolMap {
  return value as EquipTypeBoolMap
}

type SetIdLangStringMapEntryOpt = {
  [setId: number]: { [lang: string]: string } | undefined
}
export function asSetIdLangStringMapEntryOpt(value: unknown): SetIdLangStringMapEntryOpt {
  return value as SetIdLangStringMapEntryOpt
}

type SetIdLangStringOptMap = {
  [setId: number]: { [lang: string]: string | undefined }
}
export function asSetIdLangStringOptMap(value: unknown): SetIdLangStringOptMap {
  return value as SetIdLangStringOptMap
}

type SetIdToStrRecordEntryOpt = {
  [setId: number]: { [key: string]: unknown } | undefined
}
export function asSetIdToStrRecordEntryOpt(value: unknown): SetIdToStrRecordEntryOpt {
  return value as SetIdToStrRecordEntryOpt
}

type SetIdToStrRecordOpt = { [setId: number]: { [k: string]: unknown } } | undefined
export function asSetIdToStrRecordOpt(value: unknown): SetIdToStrRecordOpt {
  return value as SetIdToStrRecordOpt
}

type SetIdTableOpt = { [setId: number]: unknown } | undefined
export function asSetIdTableOpt(value: unknown): SetIdTableOpt {
  return value as SetIdTableOpt
}

type SetIdToNumKeyTable = { [setId: number]: { [k: number]: unknown } }
export function asSetIdToNumKeyTable(value: unknown): SetIdToNumKeyTable {
  return value as SetIdToNumKeyTable
}

type CategoryBoolMapOpt = { [category: number]: boolean } | undefined
export function asCategoryBoolMapOpt(value: unknown): CategoryBoolMapOpt {
  return value as CategoryBoolMapOpt
}

type SetIdPerfectedLinkMap = {
  [setId: number]: { setId: number; zoneId: number | undefined }
}
export function asSetIdPerfectedLinkMap(value: unknown): SetIdPerfectedLinkMap {
  return value as SetIdPerfectedLinkMap
}

type LangDropLocationMap = {
  [lang: string]: { [dropLocationName: string]: unknown } | undefined
}
export function asLangDropLocationMap(value: unknown): LangDropLocationMap {
  return value as LangDropLocationMap
}

type SetIdLangRecordEntryOpt = {
  [setId: number]: { [lang: string]: unknown } | undefined
}
export function asSetIdLangRecordEntryOpt(value: unknown): SetIdLangRecordEntryOpt {
  return value as SetIdLangRecordEntryOpt
}

type LangIndexStringMapOpt =
  | {
      [lang: string]: { [idx: number]: string }
    }
  | undefined
export function asLangIndexStringMapOpt(value: unknown): LangIndexStringMapOpt {
  return value as LangIndexStringMapOpt
}

type LangNameBoolMap = { [lang: string]: { [name: string]: boolean } }
export function asLangNameBoolMap(value: unknown): LangNameBoolMap {
  return value as LangNameBoolMap
}

type TrialSetEntryOpt = { multiTrialSet?: unknown } | undefined
export function asTrialSetEntryOpt(value: unknown): TrialSetEntryOpt {
  return value as TrialSetEntryOpt
}

type ScrollableMenuHandleOpt = { version?: string } | undefined
export function asScrollableMenuHandleOpt(value: unknown): ScrollableMenuHandleOpt {
  return value as ScrollableMenuHandleOpt
}

type LibCustomMenuHandleOpt =
  | {
      RegisterContextMenu?: (
        this: unknown,
        callback: (this: void, ...args: unknown[]) => void,
        category: unknown
      ) => void
      CATEGORY_LATE?: unknown
    }
  | undefined
export function asLibCustomMenuHandleOpt(value: unknown): LibCustomMenuHandleOpt {
  return value as LibCustomMenuHandleOpt
}

type DebugGetAllDataSvOpt = { [api: number]: { running?: boolean; finished?: boolean } } | undefined
export function asDebugGetAllDataSvOpt(value: unknown): DebugGetAllDataSvOpt {
  return value as DebugGetAllDataSvOpt
}

type ParamBoolMap = { [param: string]: boolean }
export function asParamBoolMap(value: unknown): ParamBoolMap {
  return value as ParamBoolMap
}

type DebugParamMap = { [param: string]: string | ((this: void) => void) }
export function asDebugParamMap(value: unknown): DebugParamMap {
  return value as DebugParamMap
}

type MoreOptionsButton = SetsMoreOptionsButton
export function asMoreOptionsButton(value: unknown): MoreOptionsButton {
  return value as MoreOptionsButton
}

type SearchUiControl = SearchUIControl
export function asSearchUiControl(value: unknown): SearchUiControl {
  return value as SearchUiControl
}

type Unknown = unknown
export function asUnknown(value: unknown): Unknown {
  return value as Unknown
}

type RemoveLanguagesFullFn = (
  this: void,
  langTable: { [lang: string]: unknown } | undefined,
  lang: string
) => { [lang: string]: unknown } | undefined
export function asRemoveLanguagesFullFn(value: unknown): RemoveLanguagesFullFn {
  return value as RemoveLanguagesFullFn
}
