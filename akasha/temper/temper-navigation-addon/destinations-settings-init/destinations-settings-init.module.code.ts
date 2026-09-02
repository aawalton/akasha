import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { getSettingsString } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import {
  ADDON_AUTHOR,
  ADDON_VERSION,
  ADDON_WEBSITE,
} from "../destinations-names/destinations-names.module.code.ts"
import { buildAchievementGlobalSubmenu } from "../destinations-settings-achievement-global/destinations-settings-achievement-global.module.code.ts"
import { buildAchievementsSubmenu } from "../destinations-settings-achievements/destinations-settings-achievements.module.code.ts"
import { buildCollectiblesSubmenu } from "../destinations-settings-collectibles/destinations-settings-collectibles.module.code.ts"
import { buildFishingSubmenu } from "../destinations-settings-fishing/destinations-settings-fishing.module.code.ts"
import { buildGeneralOptions } from "../destinations-settings-general/destinations-settings-general.module.code.ts"
import { createAllIconPreviews } from "../destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"
import { buildMapFiltersSubmenu } from "../destinations-settings-map-filters/destinations-settings-map-filters.module.code.ts"
import { buildMiscPoiSubmenu } from "../destinations-settings-misc-poi/destinations-settings-misc-poi.module.code.ts"
import { buildUnknownPoiSubmenu } from "../destinations-settings-unknown-poi/destinations-settings-unknown-poi.module.code.ts"
import { buildVampireWerewolfSubmenu } from "../destinations-settings-vampire-werewolf/destinations-settings-vampire-werewolf.module.code.ts"

const LAM = LibAddonMenu2

const OPTIONS_PANEL_ID = "TemperDestinations_OptionsPanel"

export function initSettings(): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: getSettingsString("DEST_SETTINGS_TITLE"),
    displayName: getSettingsString("DEST_SETTINGS_TITLE"),
    author: ADDON_AUTHOR,
    version: ADDON_VERSION,
    slashCommand: "/dset",
    registerForRefresh: true,
    registerForDefaults: true,
    website: ADDON_WEBSITE,
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

  const createIcons = (panel: unknown): undefined => {
    if (panel === settingsPanel) {
      createAllIconPreviews()
      CALLBACK_MANAGER.UnregisterCallback("LAM-PanelControlsCreated", createIcons)
    }
  }
  CALLBACK_MANAGER.RegisterCallback("LAM-PanelControlsCreated", createIcons)
}
