import { asPresent } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-casts/lib-sets-casts.module.code.ts"
import { asLibSlots } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import "akasha/temper/addon/type/lib-sets/lib-sets.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-sets/lib-sets-search-ui-globals/lib-sets-search-ui-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-lib/lib-sets-lib.module.code.ts"

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
