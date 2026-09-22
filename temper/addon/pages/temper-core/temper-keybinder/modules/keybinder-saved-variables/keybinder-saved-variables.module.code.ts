import { SAVED_VARIABLES_NAME } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-constants/keybinder-constants.module.code.ts"
import { initialize } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-init/keybinder-init.module.code.ts"
import {
  type AccountData,
  KEYBINDER_STATE,
} from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-state/keybinder-state.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"

const ACCOUNT_DEFAULTS: AccountData = { Keybindings: {} }

export function initializeSavedVariables(this: void): undefined {
  KEYBINDER_STATE.account = ZO_SavedVars.New<AccountData>(
    SAVED_VARIABLES_NAME,
    1,
    undefined,
    ACCOUNT_DEFAULTS,
    "Default",
    "$Machine",
    "$UserProfileWide"
  )
  initialize()
}
