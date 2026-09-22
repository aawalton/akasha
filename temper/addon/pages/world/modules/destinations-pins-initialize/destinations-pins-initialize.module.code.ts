import "akasha/temper/addon/pages/world/modules/destinations-pins-slash-command/destinations-pins-slash-command.module.code.ts"
import { registerSettingsStrings } from "akasha/temper/addon/pages/world/modules/destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { ADDON_NAME } from "akasha/temper/addon/pages/world/modules/destinations-names/destinations-names.module.code.ts"
import {
  initializePinTextColorCollectibleDefs,
  initializePinTextColorDefs,
  initializePinTextColorFishingDefs,
  initializePinTintColorDefs,
} from "akasha/temper/addon/pages/world/modules/destinations-pins-color-defs/destinations-pins-color-defs.module.code.ts"
import {
  onAchievementUpdate,
  onPoiUpdated,
} from "akasha/temper/addon/pages/world/modules/destinations-pins-events/destinations-pins-events.module.code.ts"
import { updateCompassFilters } from "akasha/temper/addon/pages/world/modules/destinations-pins-filters/destinations-pins-filters.module.code.ts"
import {
  hookKeepTooltips,
  hookPoiTooltips,
} from "akasha/temper/addon/pages/world/modules/destinations-pins-hooks/destinations-pins-hooks.module.code.ts"
import { initVariables } from "akasha/temper/addon/pages/world/modules/destinations-pins-init-variables/destinations-pins-init-variables.module.code.ts"
import {
  disableEnglishFunctionnalities,
  showLanguageWarning,
  supported_menu_lang,
} from "akasha/temper/addon/pages/world/modules/destinations-pins-language/destinations-pins-language.module.code.ts"
import { setPinLayouts } from "akasha/temper/addon/pages/world/modules/destinations-pins-layouts-applied/destinations-pins-layouts-applied.module.code.ts"
import { redrawQolPins } from "akasha/temper/addon/pages/world/modules/destinations-pins-qol-pins/destinations-pins-qol-pins.module.code.ts"
import { initializeSetDescription } from "akasha/temper/addon/pages/world/modules/destinations-pins-sets/destinations-pins-sets.module.code.ts"
import { onGamepadPreferredModeChanged } from "akasha/temper/addon/pages/world/modules/destinations-pins-tooltips/destinations-pins-tooltips.module.code.ts"
import {
  initializeSavedVariables,
  markSavedVarsInitialized,
} from "akasha/temper/addon/pages/world/modules/destinations-saved-variables/destinations-saved-variables.module.code.ts"
import { initSettings as InitSettings } from "akasha/temper/addon/pages/world/modules/destinations-settings-init/destinations-settings-init.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"

export function initializeDestinations(): undefined {
  registerSettingsStrings()

  initializeSavedVariables()

  disableEnglishFunctionnalities()

  initializePinTextColorDefs()
  initializePinTintColorDefs()
  initializePinTextColorCollectibleDefs()
  initializePinTextColorFishingDefs()

  markSavedVarsInitialized()

  redrawQolPins()

  if (!supported_menu_lang) {
    EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED, showLanguageWarning)
  }

  initVariables()

  onGamepadPreferredModeChanged()

  hookPoiTooltips()
  hookKeepTooltips()

  setPinLayouts()

  updateCompassFilters()

  InitSettings()

  initializeSetDescription()

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_POI_UPDATED, function (this: void): undefined {
    onPoiUpdated()
  })
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_UPDATED, onAchievementUpdate)
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_GAMEPAD_PREFERRED_MODE_CHANGED,
    onGamepadPreferredModeChanged
  )
}
