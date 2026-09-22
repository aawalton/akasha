import "akasha/temper/addon/pages/keybinder/modules/addon-keybinds-entry/addon-keybinds-entry.module.code.ts"
import "akasha/temper/addon/pages/keybinder/modules/keybinder-public-api/keybinder-public-api.module.code.ts"

import { bindingFunctionsAvailable } from "akasha/temper/addon/pages/keybinder/modules/keybinder-binding-fns/keybinder-binding-fns.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/keybinder/modules/keybinder-constants/keybinder-constants.module.code.ts"
import { installBuildMasterListHook } from "akasha/temper/addon/pages/keybinder/modules/keybinder-filter/keybinder-filter.module.code.ts"
import { registerBindingEvents } from "akasha/temper/addon/pages/keybinder/modules/keybinder-keybind-events/keybinder-keybind-events.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/addon/pages/keybinder/modules/keybinder-saved-variables/keybinder-saved-variables.module.code.ts"
import { resetBindingSyncState } from "akasha/temper/addon/pages/keybinder/modules/keybinder-state/keybinder-state.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"

if (bindingFunctionsAvailable()) {
  registerBindingEvents()
  installBuildMasterListHook()
  resetBindingSyncState()
  registerAddonInit(ADDON_NAME, initializeSavedVariables)
}
