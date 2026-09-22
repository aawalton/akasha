import { asTyped } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { getSharedSearchUIClass } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-shared-class/sets-search-ui-shared-class.module.code.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes-3/sets-search-ui-shapes-3.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes-4/sets-search-ui-shapes-4.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"

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
  Initialize: (this: SetsSearchUIKeyboardObject, control: SearchUIControl) => void
  ShowUI: (this: SetsSearchUIKeyboardObject, slashOptions?: unknown) => void
  ResetUI: (this: SetsSearchUIKeyboardObject) => void
  ApplySearchParamsToUI: (this: SetsSearchUIKeyboardObject) => void
  ValidateSearchParams: (this: SetsSearchUIKeyboardObject) => boolean
  StartSearch: (
    this: SetsSearchUIKeyboardObject,
    doNotShowUI: boolean | undefined,
    wasReset?: boolean
  ) => boolean
  OnFilterChanged: (
    this: SetsSearchUIKeyboardObject,
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
