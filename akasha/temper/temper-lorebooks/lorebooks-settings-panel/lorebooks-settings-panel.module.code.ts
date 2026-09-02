import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { addCompassPinOptions } from "../lorebooks-compass-pins/lorebooks-compass-pins.module.code.ts"
import {
  ADDON_PANEL,
  ADDON_VERSION,
  ADDON_WEBSITE,
} from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import { addImmersiveModeOptions } from "../lorebooks-immersive-mode/lorebooks-immersive-mode.module.code.ts"
import { addMapPinFilterOptions } from "../lorebooks-map-pin-filters/lorebooks-map-pin-filters.module.code.ts"
import { addPinAppearanceOptions } from "../lorebooks-pin-appearance/lorebooks-pin-appearance.module.code.ts"
import { addPinMenuOptions } from "../lorebooks-pin-menus/lorebooks-pin-menus.module.code.ts"
import { asLamControlDataArray } from "../lorebooks-settings-types/lorebooks-settings-types.module.code.ts"

const LAM = LibAddonMenu2

export function createLamPanel(): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: GetString(LBOOKS_TITLE),
    displayName: ZO_HIGHLIGHT_TEXT.Colorize(GetString(LBOOKS_TITLE)),
    version: ADDON_VERSION,
    slashCommand: "/lorebooks",
    registerForRefresh: true,
    registerForDefaults: true,
    website: ADDON_WEBSITE,
  }

  let thePanelControl: unknown

  const optionsTable: unknown[] = []
  addPinAppearanceOptions(optionsTable, (): unknown => thePanelControl)
  addPinMenuOptions(optionsTable)
  addMapPinFilterOptions(optionsTable)
  addCompassPinOptions(optionsTable)
  addImmersiveModeOptions(optionsTable)

  thePanelControl = registerPanel(LAM, ADDON_PANEL, panelData, asLamControlDataArray(optionsTable))
}
