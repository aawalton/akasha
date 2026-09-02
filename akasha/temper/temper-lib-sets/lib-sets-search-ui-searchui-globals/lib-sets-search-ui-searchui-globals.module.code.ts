import { asGlobalTable } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibSetsSearchUIKeyboardObjectOpt,
  asVoidThunk,
  type VoidThunk,
} from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"

const KEYBOARD_GLOBAL_KEY = "LIBSETS_SEARCH_UI_KEYBOARD"
const GAMEPAD_GLOBAL_KEY = "LIBSETS_SEARCH_UI_GAMEPAD"

const globalTable = asGlobalTable(globalThis)

export function getKeyboardSearchUI(this: void): LibSetsSearchUIKeyboardObject | undefined {
  return asLibSetsSearchUIKeyboardObjectOpt(globalTable[KEYBOARD_GLOBAL_KEY])
}

export function setKeyboardSearchUI(this: void, object: LibSetsSearchUIKeyboardObject): undefined {
  globalTable[KEYBOARD_GLOBAL_KEY] = object
}

export function getGamepadSearchUI(this: void): LibSetsSearchUIKeyboardObject | undefined {
  return asLibSetsSearchUIKeyboardObjectOpt(globalTable[GAMEPAD_GLOBAL_KEY])
}

const KEYBOARD_ONRESIZE_KEY = "LibSets_SearchUI_Keyboard_TopLevel_OnResize"
type KeyboardOnResize = (
  this: void,
  control: SearchUIControl,
  resizeStart: boolean,
  forceResizeNow?: boolean
) => void
function asKeyboardOnResize(value: unknown): KeyboardOnResize {
  return value as KeyboardOnResize
}

export function getKeyboardTopLevelOnResize(this: void): KeyboardOnResize {
  return asKeyboardOnResize(globalTable[KEYBOARD_ONRESIZE_KEY])
}

const SHARED_BRING_TO_TOP_KEY = "LibSets_SearchUI_Shared_BringWindowToTop"

export function getSharedBringWindowToTop(this: void): VoidThunk {
  return asVoidThunk(globalTable[SHARED_BRING_TO_TOP_KEY])
}
