import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes-3/sets-search-ui-shapes-3.type-declaration.d.ts"

let keyboardSearchUI: SetsSearchUIKeyboardObject | undefined
let gamepadSearchUI: SetsSearchUIKeyboardObject | undefined

export function getKeyboardSearchUI(this: void): SetsSearchUIKeyboardObject | undefined {
  return keyboardSearchUI
}

export function setKeyboardSearchUI(this: void, object: SetsSearchUIKeyboardObject): undefined {
  keyboardSearchUI = object
}

export function getGamepadSearchUI(this: void): SetsSearchUIKeyboardObject | undefined {
  return gamepadSearchUI
}
