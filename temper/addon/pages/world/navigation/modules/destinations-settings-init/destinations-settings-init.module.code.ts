import { getSettingsString } from "akasha/temper/addon/pages/world/navigation/modules/destinations-lang-strings/destinations-lang-strings.module.code.ts"
import {
  ADDON_AUTHOR,
  ADDON_VERSION,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-names/destinations-names.module.code.ts"
import { buildAchievementGlobalSubmenu } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-achievement-global/destinations-settings-achievement-global.module.code.ts"
import { buildAchievementsSubmenu } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-achievements/destinations-settings-achievements.module.code.ts"
import { buildCollectiblesSubmenu } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-collectibles/destinations-settings-collectibles.module.code.ts"
import { buildFishingSubmenu } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-fishing/destinations-settings-fishing.module.code.ts"
import { buildGeneralOptions } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-general/destinations-settings-general.module.code.ts"
import { createAllIconPreviews } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"
import { buildMapFiltersSubmenu } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-map-filters/destinations-settings-map-filters.module.code.ts"
import { buildMiscPoiSubmenu } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-misc-poi/destinations-settings-misc-poi.module.code.ts"
import { buildUnknownPoiSubmenu } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-unknown-poi/destinations-settings-unknown-poi.module.code.ts"
import { buildVampireWerewolfSubmenu } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-vampire-werewolf/destinations-settings-vampire-werewolf.module.code.ts"
import { whenPanelControlsCreated } from "akasha/temper/addon/shared/settings-panel/modules/panel-controls-created/panel-controls-created.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const LAM = TemperAddonMenu

const OPTIONS_PANEL_ID = "TemperDestinations_OptionsPanel"

export function initSettings(): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_TITLE"),
    displayName: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_TITLE"),
    author: ADDON_AUTHOR,
    version: ADDON_VERSION,
    slashCommand: "/dset",
    registerForRefresh: true,
    registerForDefaults: true,
  }
  const optionsTable: LamControlData[] = []
  for (const option of buildGeneralOptions()) {
    optionsTable.push(option)
  }
  optionsTable.push(buildUnknownPoiSubmenu())
  optionsTable.push(buildAchievementsSubmenu())
  optionsTable.push(buildAchievementGlobalSubmenu())
  optionsTable.push(buildMiscPoiSubmenu())
  optionsTable.push(buildVampireWerewolfSubmenu())
  optionsTable.push(buildCollectiblesSubmenu())
  optionsTable.push(buildFishingSubmenu())
  optionsTable.push(buildMapFiltersSubmenu())

  const settingsPanel = registerPanel(LAM, OPTIONS_PANEL_ID, panelData, optionsTable)

  whenPanelControlsCreated(CALLBACK_MANAGER, settingsPanel, createAllIconPreviews)
}
