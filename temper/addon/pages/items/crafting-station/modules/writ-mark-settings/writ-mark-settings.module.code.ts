import { PUBLIC as CHARACTER_KNOWLEDGE } from "akasha/temper/addon/pages/items/crafting-station/modules/knowledge-state/knowledge-state.module.code.ts"
import {
  ADDON_NAME,
  ADDON_TITLE,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-mark-constants/writ-mark-constants.module.code.ts"
import { initializeInventoryTweaks } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-mark-inventory-tweaks/writ-mark-inventory-tweaks.module.code.ts"
import {
  areInventoryTweaksEnabled,
  getMarkerColor,
  getSv,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-mark-saved-variables/writ-mark-saved-variables.module.code.ts"
import { valueDropdown } from "akasha/temper/addon/shared/settings-panel/modules/dropdown/dropdown.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-helpers-global/temper-helpers-global.type-declaration.d.ts"

const PANEL_ID = "TemperMasterWritInventoryMarkerSettings"

export function registerSettingsPanel(this: void): undefined {
  const lam = TemperHelpers.GetLibAddonMenu()
  if (lam === undefined) {
    return undefined
  }

  const panelData: LamPanelData = {
    type: "panel",
    name: ADDON_TITLE,
    version: TemperHelpers.FormatVersion(TemperHelpers.GetAddOnVersion(ADDON_NAME)),
    registerForRefresh: true,
  }

  const chars: string[] = ["disabled", "default", "current"]
  const charLabels: string[] = ["Disabled", "Highest priority character", "Current character"]
  for (const [, char] of ipairs(CHARACTER_KNOWLEDGE.GetCharacterList())) {
    chars.push(char.id)
    charLabels.push(char.name)
  }

  const controls: LamControlData[] = [
    { type: "header", name: "Marker Colors" },
    {
      type: "colorpicker",
      name: "Doable",
      getFunc: () => {
        return TemperHelpers.Int24ToRGB(getMarkerColor("doable"))
      },
      setFunc: (r, g, b, a) => {
        getSv().doable = TemperHelpers.RGBToInt24(r, g, b, a)
      },
    },
    {
      type: "colorpicker",
      name: "Completed",
      getFunc: () => {
        return TemperHelpers.Int24ToRGB(getMarkerColor("completed"))
      },
      setFunc: (r, g, b, a) => {
        getSv().completed = TemperHelpers.RGBToInt24(r, g, b, a)
      },
    },
    {
      type: "colorpicker",
      name: "Unknown Motif",
      getFunc: () => {
        return TemperHelpers.Int24ToRGB(getMarkerColor("unknown"))
      },
      setFunc: (r, g, b, a) => {
        getSv().unknown = TemperHelpers.RGBToInt24(r, g, b, a)
      },
    },
    { type: "header", name: "Motif Knowledge" },
    valueDropdown<string>({
      name: "Mark items requiring a motif unknown by",
      choices: charLabels,
      values: chars,
      scrollable: true,
      get: () => getSv().motifChar ?? "default",
      set: (value) => {
        getSv().motifChar = value
      },
    }),
    { type: "header", name: "Miscellaneous" },
    {
      type: "checkbox",
      name: "Require sufficient materials for doable writs",
      getFunc: () => getSv().requireMats === true,
      setFunc: (enabled) => {
        getSv().requireMats = enabled
      },
    },
    {
      type: "checkbox",
      name: "Enable additional inventory management tweaks",
      getFunc: areInventoryTweaksEnabled,
      setFunc: (enabled) => {
        getSv().inventoryTweaks = enabled
        initializeInventoryTweaks()
      },
    },
  ]

  registerPanel(lam, PANEL_ID, panelData, controls)
  return undefined
}
