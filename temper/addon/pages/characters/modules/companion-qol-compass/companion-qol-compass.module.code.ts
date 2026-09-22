import "akasha/temper/eso/type/eso-enums-18/eso-enums-18.type-declaration.d.ts"
import { COMPANION_QOL } from "akasha/temper/addon/pages/characters/modules/companion-qol-state/companion-qol-state.module.code.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"

COMPANION_QOL.UpdateCompass = function (this: void): undefined {
  const settings = COMPANION_QOL.settingsVars.settings

  if (settings.disableCompanionAtCompass === true) {
    COMPASS.container.SetAlphaDropoffBehavior(MAP_PIN_TYPE_ACTIVE_COMPANION, 0, 0, 0, 0)
  } else {
    COMPASS.container.SetAlphaDropoffBehavior(MAP_PIN_TYPE_ACTIVE_COMPANION, 1, 1, 1, 1)
  }
  return undefined
}
