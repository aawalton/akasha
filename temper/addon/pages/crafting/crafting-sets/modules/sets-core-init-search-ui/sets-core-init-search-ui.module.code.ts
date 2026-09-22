import { asPresent } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { asLibSlots } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import { asSearchUIControl } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-casts/sets-search-ui-casts.module.code.ts"
import { setsSearchUIKeyboardTopLevelOnInitialized } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-keyboard-search-handlers/sets-search-ui-keyboard-search-handlers.module.code.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

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
    setsSearchUIKeyboardTopLevelOnInitialized(asSearchUIControl(searchUIKeyboard))
  }
}
asLibSlots(lib)["_InitSearchUI"] = initSearchUI
