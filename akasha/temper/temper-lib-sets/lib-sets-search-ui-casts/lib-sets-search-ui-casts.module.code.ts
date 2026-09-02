export function asSearchUIControl(value: unknown): SearchUIControl {
  return value as SearchUIControl
}

export type SearchUIControlOpt = SearchUIControl | undefined
export function asSearchUIControlOpt(value: unknown): SearchUIControlOpt {
  return value as SearchUIControlOpt
}

export function asSearchUIEditBox(value: unknown): SearchUIEditBox {
  return value as SearchUIEditBox
}

export function asSearchUIComboBox(value: unknown): SearchUIComboBox {
  return value as SearchUIComboBox
}

export type SearchUIComboBoxOpt = SearchUIComboBox | undefined
export function asSearchUIComboBoxOpt(value: unknown): SearchUIComboBoxOpt {
  return value as SearchUIComboBoxOpt
}

export function asLibSetsSearchRowData(value: unknown): LibSetsSearchRowData {
  return value as LibSetsSearchRowData
}

export type LibSetsSearchRowDataOpt = LibSetsSearchRowData | undefined
export function asLibSetsSearchRowDataOpt(value: unknown): LibSetsSearchRowDataOpt {
  return value as LibSetsSearchRowDataOpt
}

export type LibSetsSearchUIKeyboardObjectOpt = LibSetsSearchUIKeyboardObject | undefined
export function asLibSetsSearchUIKeyboardObjectOpt(
  value: unknown
): LibSetsSearchUIKeyboardObjectOpt {
  return value as LibSetsSearchUIKeyboardObjectOpt
}

export function asLibSetsSearchUIDescriptorExt(value: unknown): LibSetsSearchUIDescriptorExt {
  return value as LibSetsSearchUIDescriptorExt
}

export function asLibSetsCopyDialogData(value: unknown): LibSetsCopyDialogData {
  return value as LibSetsCopyDialogData
}

export type VoidThunk = (this: void) => void
export function asVoidThunk(value: unknown): VoidThunk {
  return value as VoidThunk
}

export type VoidVarargsHandler = (this: void, ...a: unknown[]) => void
export function asVoidVarargsHandler(value: unknown): VoidVarargsHandler {
  return value as VoidVarargsHandler
}

export type ComboBoxSortKeyFunc = (this: void, comboBox: SearchUIComboBox) => string
export function asComboBoxSortKeyFunc(value: unknown): ComboBoxSortKeyFunc {
  return value as ComboBoxSortKeyFunc
}

export type ComboBoxSortKey = string | ComboBoxSortKeyFunc
export function asComboBoxSortKey(value: unknown): ComboBoxSortKey {
  return value as ComboBoxSortKey
}

export type ComboBoxSortKeyOpt = ComboBoxSortKey | undefined
export function asComboBoxSortKeyOpt(value: unknown): ComboBoxSortKeyOpt {
  return value as ComboBoxSortKeyOpt
}

export type ControlWidthFunc = (this: void, control: SearchUIControl) => number
export function asControlWidthFunc(value: unknown): ControlWidthFunc {
  return value as ControlWidthFunc
}

export type NumberOrString = number | string
export function asNumberOrString(value: unknown): NumberOrString {
  return value as NumberOrString
}

export type NumberOrStringOpt = number | string | undefined
export function asNumberOrStringOpt(value: unknown): NumberOrStringOpt {
  return value as NumberOrStringOpt
}

export type AnyObjectOpt = object | undefined
export function asAnyObjectOpt(value: unknown): AnyObjectOpt {
  return value as AnyObjectOpt
}

export type LangStringRecord = { [lang: string]: string | undefined }
export function asLangStringRecord(value: unknown): LangStringRecord {
  return value as LangStringRecord
}

export type StringOptArray = (string | undefined)[]
export function asStringOptArray(value: unknown): StringOptArray {
  return value as StringOptArray
}

export type IdBoolMap = { [id: string]: boolean }
export function asIdBoolMap(value: unknown): IdBoolMap {
  return value as IdBoolMap
}

export type IdBoolMapOpt = IdBoolMap | undefined
export function asIdBoolMapOpt(value: unknown): IdBoolMapOpt {
  return value as IdBoolMapOpt
}

export type IdNumBoolMap = { [id: number]: boolean }
export function asIdNumBoolMap(value: unknown): IdNumBoolMap {
  return value as IdNumBoolMap
}

export type IdNumBoolMapOpt = IdNumBoolMap | undefined
export function asIdNumBoolMapOpt(value: unknown): IdNumBoolMapOpt {
  return value as IdNumBoolMapOpt
}

export type CategoryBoolMap = { [category: string]: boolean }
export function asCategoryBoolMap(value: unknown): CategoryBoolMap {
  return value as CategoryBoolMap
}

export type CategoryBoolMapOpt = CategoryBoolMap | undefined
export function asCategoryBoolMapOpt(value: unknown): CategoryBoolMapOpt {
  return value as CategoryBoolMapOpt
}

export type IdNumRecord = { [id: number]: unknown }
export function asIdNumRecord(value: unknown): IdNumRecord {
  return value as IdNumRecord
}

export type IdNumRecordOpt = IdNumRecord | undefined
export function asIdNumRecordOpt(value: unknown): IdNumRecordOpt {
  return value as IdNumRecordOpt
}

export type CategoryRecordOpt = { [category: string]: unknown } | undefined
export function asCategoryRecordOpt(value: unknown): CategoryRecordOpt {
  return value as CategoryRecordOpt
}

export type SetInfoMap = { [setId: number]: { [key: string]: unknown } }
export function asSetInfoMap(value: unknown): SetInfoMap {
  return value as SetInfoMap
}

export type SearchHistoryStringMap = { [type: string]: string[] | undefined }
export function asSearchHistoryStringMap(value: unknown): SearchHistoryStringMap {
  return value as SearchHistoryStringMap
}

export type SearchHistoryStringMapOpt = SearchHistoryStringMap | undefined
export function asSearchHistoryStringMapOpt(value: unknown): SearchHistoryStringMapOpt {
  return value as SearchHistoryStringMapOpt
}

export type SearchHistoryUnknownMap = { [type: string]: unknown[] | undefined }
export function asSearchHistoryUnknownMap(value: unknown): SearchHistoryUnknownMap {
  return value as SearchHistoryUnknownMap
}

export type SearchHistoryUnknownMapPresent = { [type: string]: unknown[] }
export function asSearchHistoryUnknownMapPresent(value: unknown): SearchHistoryUnknownMapPresent {
  return value as SearchHistoryUnknownMapPresent
}

export type FavoritesNestedMapOpt =
  | { [category: string]: { [setId: number]: boolean } | undefined }
  | undefined
export function asFavoritesNestedMapOpt(value: unknown): FavoritesNestedMapOpt {
  return value as FavoritesNestedMapOpt
}

export type PrefilterSetData = {
  setType?: number
  dlcId?: number
  numBonuses?: number
  dropZones?: { [id: number]: boolean }
  [key: string]: unknown
}
export function asPrefilterSetData(value: unknown): PrefilterSetData {
  return value as PrefilterSetData
}

export type DropLocationNamesMapOpt =
  | { [id: number]: { [lang: string]: string | undefined } }
  | undefined
export function asDropLocationNamesMapOpt(value: unknown): DropLocationNamesMapOpt {
  return value as DropLocationNamesMapOpt
}

export type LineNumberMapOpt = { [line: number]: number | undefined } | undefined
export function asLineNumberMapOpt(value: unknown): LineNumberMapOpt {
  return value as LineNumberMapOpt
}

export type ParamStringMap = { [param: string]: string }
export function asParamStringMap(value: unknown): ParamStringMap {
  return value as ParamStringMap
}
