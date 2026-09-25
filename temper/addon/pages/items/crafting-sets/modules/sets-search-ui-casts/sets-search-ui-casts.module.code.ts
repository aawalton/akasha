import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-copy-dialog-shapes/sets-copy-dialog-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-3/sets-search-ui-shapes-3.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-4/sets-search-ui-shapes-4.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"

export function asSearchUIControl(value: unknown): SearchUIControl {
  return value as SearchUIControl
}

type SearchUIControlOpt = SearchUIControl | undefined
export function asSearchUIControlOpt(value: unknown): SearchUIControlOpt {
  return value as SearchUIControlOpt
}

export function asSearchUIEditBox(value: unknown): SearchUIEditBox {
  return value as SearchUIEditBox
}

export function asSearchUIComboBox(value: unknown): SearchUIComboBox {
  return value as SearchUIComboBox
}

type SearchUIComboBoxOpt = SearchUIComboBox | undefined
export function asSearchUIComboBoxOpt(value: unknown): SearchUIComboBoxOpt {
  return value as SearchUIComboBoxOpt
}

export function asSetsSearchRowData(value: unknown): SetsSearchRowData {
  return value as SetsSearchRowData
}

type SetsSearchRowDataOpt = SetsSearchRowData | undefined
export function asSetsSearchRowDataOpt(value: unknown): SetsSearchRowDataOpt {
  return value as SetsSearchRowDataOpt
}

type SetsSearchUIKeyboardObjectOpt = SetsSearchUIKeyboardObject | undefined
export function asSetsSearchUIKeyboardObjectOpt(value: unknown): SetsSearchUIKeyboardObjectOpt {
  return value as SetsSearchUIKeyboardObjectOpt
}

export function asSetsSearchUIDescriptorExt(value: unknown): SetsSearchUIDescriptorExt {
  return value as SetsSearchUIDescriptorExt
}

export function asSetsCopyDialogData(value: unknown): SetsCopyDialogData {
  return value as SetsCopyDialogData
}

type VoidVarargsHandler = (this: void, ...a: unknown[]) => void
export function asVoidVarargsHandler(value: unknown): VoidVarargsHandler {
  return value as VoidVarargsHandler
}

type ComboBoxSortKeyFunc = (this: void, comboBox: SearchUIComboBox) => string
export function asComboBoxSortKeyFunc(value: unknown): ComboBoxSortKeyFunc {
  return value as ComboBoxSortKeyFunc
}

type ComboBoxSortKey = string | ComboBoxSortKeyFunc
export function asComboBoxSortKey(value: unknown): ComboBoxSortKey {
  return value as ComboBoxSortKey
}

type ComboBoxSortKeyOpt = ComboBoxSortKey | undefined
export function asComboBoxSortKeyOpt(value: unknown): ComboBoxSortKeyOpt {
  return value as ComboBoxSortKeyOpt
}

type ControlWidthFunc = (this: void, control: SearchUIControl) => number
export function asControlWidthFunc(value: unknown): ControlWidthFunc {
  return value as ControlWidthFunc
}

type NumberOrString = number | string
export function asNumberOrString(value: unknown): NumberOrString {
  return value as NumberOrString
}

type NumberOrStringOpt = number | string | undefined
export function asNumberOrStringOpt(value: unknown): NumberOrStringOpt {
  return value as NumberOrStringOpt
}

type AnyObjectOpt = object | undefined
export function asAnyObjectOpt(value: unknown): AnyObjectOpt {
  return value as AnyObjectOpt
}

type LangStringRecord = { [lang: string]: string | undefined }
export function asLangStringRecord(value: unknown): LangStringRecord {
  return value as LangStringRecord
}

type StringOptArray = (string | undefined)[]
export function asStringOptArray(value: unknown): StringOptArray {
  return value as StringOptArray
}

type IdBoolMap = { [id: string]: boolean }
export function asIdBoolMap(value: unknown): IdBoolMap {
  return value as IdBoolMap
}

type IdBoolMapOpt = IdBoolMap | undefined
export function asIdBoolMapOpt(value: unknown): IdBoolMapOpt {
  return value as IdBoolMapOpt
}

type IdNumBoolMap = { [id: number]: boolean }

type IdNumBoolMapOpt = IdNumBoolMap | undefined
export function asIdNumBoolMapOpt(value: unknown): IdNumBoolMapOpt {
  return value as IdNumBoolMapOpt
}

type CategoryBoolMap = { [category: string]: boolean }

type CategoryBoolMapOpt = CategoryBoolMap | undefined
export function asCategoryBoolMapOpt(value: unknown): CategoryBoolMapOpt {
  return value as CategoryBoolMapOpt
}

type IdNumRecord = { [id: number]: unknown }

type IdNumRecordOpt = IdNumRecord | undefined
export function asIdNumRecordOpt(value: unknown): IdNumRecordOpt {
  return value as IdNumRecordOpt
}

type CategoryRecordOpt = { [category: string]: unknown } | undefined
export function asCategoryRecordOpt(value: unknown): CategoryRecordOpt {
  return value as CategoryRecordOpt
}

type SetInfoMap = { [setId: number]: { [key: string]: unknown } }
export function asSetInfoMap(value: unknown): SetInfoMap {
  return value as SetInfoMap
}

type SearchHistoryStringMap = { [type: string]: string[] | undefined }
export function asSearchHistoryStringMap(value: unknown): SearchHistoryStringMap {
  return value as SearchHistoryStringMap
}

type SearchHistoryStringMapOpt = SearchHistoryStringMap | undefined
export function asSearchHistoryStringMapOpt(value: unknown): SearchHistoryStringMapOpt {
  return value as SearchHistoryStringMapOpt
}

type SearchHistoryUnknownMap = { [type: string]: unknown[] | undefined }
export function asSearchHistoryUnknownMap(value: unknown): SearchHistoryUnknownMap {
  return value as SearchHistoryUnknownMap
}

type SearchHistoryUnknownMapPresent = { [type: string]: unknown[] }
export function asSearchHistoryUnknownMapPresent(value: unknown): SearchHistoryUnknownMapPresent {
  return value as SearchHistoryUnknownMapPresent
}

type FavoritesNestedMapOpt =
  | { [category: string]: { [setId: number]: boolean } | undefined }
  | undefined
export function asFavoritesNestedMapOpt(value: unknown): FavoritesNestedMapOpt {
  return value as FavoritesNestedMapOpt
}

type PrefilterSetData = {
  setType?: number
  dlcId?: number
  numBonuses?: number
  dropZones?: { [id: number]: boolean }
  [key: string]: unknown
}
export function asPrefilterSetData(value: unknown): PrefilterSetData {
  return value as PrefilterSetData
}

type DropLocationNamesMapOpt = { [id: number]: { [lang: string]: string | undefined } } | undefined
export function asDropLocationNamesMapOpt(value: unknown): DropLocationNamesMapOpt {
  return value as DropLocationNamesMapOpt
}

type LineNumberMapOpt = { [line: number]: number | undefined } | undefined
export function asLineNumberMapOpt(value: unknown): LineNumberMapOpt {
  return value as LineNumberMapOpt
}

type ParamStringMap = { [param: string]: string }
export function asParamStringMap(value: unknown): ParamStringMap {
  return value as ParamStringMap
}
