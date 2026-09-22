import "akasha/temper/addon/pages/crafting/crafting-sets/lib-sets-search-ui-shapes-3/lib-sets-search-ui-shapes-3.type-declaration.d.ts"

let keyboardSearchUI: LibSetsSearchUIKeyboardObject | undefined
let gamepadSearchUI: LibSetsSearchUIKeyboardObject | undefined

export function getKeyboardSearchUI(this: void): LibSetsSearchUIKeyboardObject | undefined {
  return keyboardSearchUI
}

export function setKeyboardSearchUI(this: void, object: LibSetsSearchUIKeyboardObject): undefined {
  keyboardSearchUI = object
}

export function getGamepadSearchUI(this: void): LibSetsSearchUIKeyboardObject | undefined {
  return gamepadSearchUI
}
