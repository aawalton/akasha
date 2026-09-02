import { asGlobalTable, asTyped } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { getSharedSearchUIClass } from "../lib-sets-search-ui-shared-class/lib-sets-search-ui-shared-class.module.code.ts"

const sharedClass = asTyped<ZoInitializingObjectClass>(getSharedSearchUIClass())

const keyboardClass = sharedClass.Subclass<LibSetsSearchUIKeyboardClass>()

export function getKeyboardSearchUIClass(this: void): LibSetsSearchUIKeyboardClass {
  return keyboardClass
}

type KeyboardOverriddenMethod =
  | "Initialize"
  | "ShowUI"
  | "ResetUI"
  | "ApplySearchParamsToUI"
  | "ValidateSearchParams"
  | "StartSearch"
  | "OnFilterChanged"
interface KeyboardClassAssign extends Omit<LibSetsSearchUIKeyboardClass, KeyboardOverriddenMethod> {
  Initialize: (this: LibSetsSearchUIKeyboardObject, control: SearchUIControl) => void
  ShowUI: (this: LibSetsSearchUIKeyboardObject, slashOptions?: unknown) => void
  ResetUI: (this: LibSetsSearchUIKeyboardObject) => void
  ApplySearchParamsToUI: (this: LibSetsSearchUIKeyboardObject) => void
  ValidateSearchParams: (this: LibSetsSearchUIKeyboardObject) => boolean
  StartSearch: (
    this: LibSetsSearchUIKeyboardObject,
    doNotShowUI: boolean | undefined,
    wasReset?: boolean
  ) => boolean
  OnFilterChanged: (
    this: LibSetsSearchUIKeyboardObject,
    dropdownControl?: SearchUIControl,
    editControl?: SearchUIEditBox
  ) => void
}

function asKeyboardClassAssign(value: unknown): KeyboardClassAssign {
  return value as KeyboardClassAssign
}

export function getKeyboardSearchUIClassForOverride(this: void): KeyboardClassAssign {
  return asKeyboardClassAssign(keyboardClass)
}

asGlobalTable(globalThis).LibSets_SearchUI_Keyboard = keyboardClass
