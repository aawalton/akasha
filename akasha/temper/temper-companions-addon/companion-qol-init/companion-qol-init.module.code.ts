import "@akasha/temper-addon-library-types/lib-addon-menu"
import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-api-2"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-02"
import "@akasha/temper-eso-types/eso-enums-05"
import "@akasha/temper-eso-types/eso-enums-06"
import "@akasha/temper-eso-types/eso-enums-15"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-18"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-interface-extra-2"
import "@akasha/temper-eso-types/eso-string-ids"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import "@akasha/temper-eso-types/tstl-language-extensions"
import "../companion-qol-globals/companion-qol-globals.module.code.ts"

import "../companion-qol-constants/companion-qol-constants.module.code.ts"
import "../companion-qol-core/companion-qol-core.module.code.ts"
import "../companion-qol-rapport/companion-qol-rapport.module.code.ts"
import "../companion-qol-compass/companion-qol-compass.module.code.ts"
import "../companion-qol-saved-variables/companion-qol-saved-variables.module.code.ts"
import "../companion-qol-interaction-handlers/companion-qol-interaction-handlers.module.code.ts"
import "../companion-qol-settings-menu/companion-qol-settings-menu.module.code.ts"

import { registerBindingStringIds } from "../companion-qol-bindings/companion-qol-bindings.module.code.ts"
import { FCOCO } from "../companion-qol-state/companion-qol-state.module.code.ts"
import { registerUiStrings } from "../companion-qol-ui-strings/companion-qol-ui-strings.module.code.ts"

registerUiStrings()
registerBindingStringIds()

export function initializeFcoCompanion(): undefined {
  if (FCOCO.isCompanionUnlocked) {
    FCOCO.addonLoaded(FCOCO.addonVars.addonName, FCOCO.addonVars.addonName)
  }
  return undefined
}
