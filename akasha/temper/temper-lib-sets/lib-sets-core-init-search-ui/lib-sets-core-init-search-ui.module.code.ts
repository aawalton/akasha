import { asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { asLibSlots } from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"

const lib = LibSets

let searchUIKeyboard: unknown

function initSearchUI(this: void, gamepadPreferred?: boolean): undefined {
  if (!lib.fullyLoaded) {
    return
  }
  const searchUI = lib.SearchUI
  if (gamepadPreferred === undefined || gamepadPreferred === false) {
    searchUIKeyboard = searchUIKeyboard ?? GetControl(asPresent(searchUI.controlName.get(false)))
    if (searchUIKeyboard === undefined) {
      return
    }
    searchUI.control.set(false, searchUIKeyboard)
    LibSets_SearchUI_Keyboard_TopLevel_OnInitialized(searchUIKeyboard)
  }
}
asLibSlots(lib)["_InitSearchUI"] = initSearchUI
