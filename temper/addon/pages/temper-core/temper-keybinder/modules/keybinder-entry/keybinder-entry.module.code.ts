import "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/addon-keybinds-entry/addon-keybinds-entry.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-public-api/keybinder-public-api.module.code.ts"

import { bindingFunctionsAvailable } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-binding-fns/keybinder-binding-fns.module.code.ts"
import { installBuildMasterListHook } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-filter/keybinder-filter.module.code.ts"
import { registerBindingEvents } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-keybind-events/keybinder-keybind-events.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-saved-variables/keybinder-saved-variables.module.code.ts"
import { resetBindingSyncState } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-state/keybinder-state.module.code.ts"

if (bindingFunctionsAvailable()) {
  registerBindingEvents()
  installBuildMasterListHook()
  resetBindingSyncState()
}

export function initializeKeybinder(this: void): undefined {
  if (bindingFunctionsAvailable()) initializeSavedVariables()
}
