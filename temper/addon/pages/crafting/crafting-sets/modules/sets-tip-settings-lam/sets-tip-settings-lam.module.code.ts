import {
  asBoolean,
  asPresent,
  asString,
  asStrRecord,
  asTyped,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { MENU_STATE } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-tip-settings-state/sets-tip-settings-state.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-tip-state/sets-tip-state.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import { getKeyboardSearchUI } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-searchui-globals/sets-search-ui-searchui-globals.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

function showSettingsMenu(this: void): undefined {
  if (lib.IsConsole || IsInGamepadPreferredMode()) {
    return
  }
  const lam = MENU_STATE.lam
  if (lam === undefined || lib.LAMsettingsPanel === undefined) {
    return
  }
  const keyboardSearchUI = getKeyboardSearchUI()
  if (keyboardSearchUI !== undefined) {
    keyboardSearchUI.HideUI()
  }
  lam.OpenToPanel.call(lam, lib.LAMsettingsPanel)
}
lib.ShowSettingsMenu = showSettingsMenu

function lamToggle(
  this: void,
  name: unknown,
  tooltip: unknown,
  tt: { [key: string]: unknown },
  dtt: { [key: string]: unknown },
  sv: { [key: string]: unknown },
  key: string,
  disabled: (this: void) => boolean
): { [k: string]: unknown } {
  return {
    type: "checkbox",
    name,
    tooltip,
    getFunc: (): unknown => tt[key],
    setFunc: (value: unknown): undefined => {
      asStrRecord(sv["tooltipModifications"])[key] = value
      lib.IsLibSetsTooltipEnabled()
    },
    default: dtt[key],
    disabled,
    width: "full",
  }
}

function loadLAMSettingsMenu(this: void): boolean | undefined {
  const lam = MENU_STATE.lam
  if (lam === undefined || MENU_STATE.settingsMenuCreated.get(false) === true) {
    return undefined
  }

  const localization = asStrRecord(lib.localization[lib.LangAllowedCheck(lib.clientLang)])
  const panelData = {
    type: "panel",
    name: lib.name,
    displayName: lib.name,
    version: tostring(lib.version),
    registerForRefresh: true,
    registerForDefaults: true,
    slashCommand: "/setsettings",
  }
  const lamPanelName = lib.name + "_LAM"

  const settings = asPresent(lib.svData)
  const defaultSettings = lib.defaultSV
  const tt = asStrRecord(settings["tooltipModifications"]) ?? {}
  const dtt = asStrRecord(defaultSettings["tooltipModifications"]) ?? {}
  const sv = settings

  function tooltipLAMDisabledFunc(this: void): boolean {
    return !settings["modifyTooltips"] || lib.IsLibSetsCustomTooltipEnabled()
  }

  const optionsTable: unknown[] = [
    { type: "header", name: localization["headerSlashCommands"] },
    { type: "description", title: localization["previewTT"], text: localization["previewTT_TT"] },
    {
      type: "checkbox",
      name: localization["previewTTToChatToo"],
      tooltip: localization["previewTTToChatToo_TT"],
      getFunc: (): unknown => asStrRecord(settings["setPreviewTooltips"])["sendToChatToo"],
      setFunc: (value: unknown): undefined => {
        asStrRecord(sv["setPreviewTooltips"])["sendToChatToo"] = value
      },
      default: asStrRecord(defaultSettings["setPreviewTooltips"])["sendToChatToo"],
      disabled: (): boolean => false,
      width: "full",
    },
    {
      type: "description",
      title: localization["setSearchTT"],
      text: localization["previewTT_SetSearch_TT"],
    },
    { type: "header", name: localization["headerUIStuff"] },
    {
      type: "checkbox",
      name: localization["addSetCollectionsCurrentZoneButton"],
      tooltip: localization["addSetCollectionsCurrentZoneButton"],
      getFunc: (): unknown => settings["addSetCollectionsCurrentZoneButton"],
      setFunc: (value: unknown): undefined => {
        sv["addSetCollectionsCurrentZoneButton"] = value
        if (lib.addUIButtons !== undefined) {
          lib.addUIButtons()
        }
      },
      default: defaultSettings["addSetCollectionsCurrentZoneButton"],
      disabled: (): boolean => false,
      requiresReload: false,
      width: "full",
    },
    { type: "header", name: localization["headerItemLinks"] },
    {
      type: "checkbox",
      name: localization["addSetCollectionsSearchItemLink"],
      tooltip: localization["addSetCollectionsSearchItemLink"],
      getFunc: (): unknown => settings["addSetCollectionsSearchItemLink"],
      setFunc: (value: unknown): undefined => {
        sv["addSetCollectionsSearchItemLink"] = value
        if (lib.addSetCollectionsSearchItemLinkContextMenuEntry !== undefined) {
          lib.addSetCollectionsSearchItemLinkContextMenuEntry()
        }
      },
      default: defaultSettings["addSetCollectionsSearchItemLink"],
      disabled: (): boolean => lib.LCM === undefined,
      requiresReload: true,
      width: "full",
    },
    { type: "header", name: localization["headerTooltips"] },
    {
      type: "checkbox",
      name: localization["modifyTooltip"],
      tooltip: localization["modifyTooltip"],
      getFunc: (): unknown => settings["modifyTooltips"],
      setFunc: (value: unknown): undefined => {
        sv["modifyTooltips"] = value
        STATE.useCustomTooltip = lib.IsLibSetsCustomTooltipEnabled()
        lib.IsLibSetsTooltipEnabled()
      },
      default: defaultSettings["modifyTooltips"],
      disabled: (): boolean => false,
      requiresReload: true,
      width: "full",
    },
    {
      type: "checkbox",
      name: localization["tooltipTextures"],
      tooltip: localization["tooltipTextures_TT"],
      getFunc: (): unknown => tt["tooltipTextures"],
      setFunc: (value: unknown): undefined => {
        asStrRecord(sv["tooltipModifications"])["tooltipTextures"] = value
        lib.IsLibSetsTooltipEnabled()
      },
      default: dtt["tooltipTextures"],
      disabled: tooltipLAMDisabledFunc,
      width: "full",
    },
    {
      type: "description",
      title: localization["defaultTooltipPattern"],
      text: localization["defaultTooltipPattern_TT"],
    },
    lamToggle(
      localization["setType"],
      localization["setType"],
      tt,
      dtt,
      sv,
      "addSetType",
      tooltipLAMDisabledFunc
    ),
    lamToggle(
      localization["dropZones"],
      localization["dropZones"],
      tt,
      dtt,
      sv,
      "addDropLocation",
      tooltipLAMDisabledFunc
    ),
    lamToggle(
      localization["dropMechanic"],
      localization["dropMechanic"],
      tt,
      dtt,
      sv,
      "addDropMechanic",
      tooltipLAMDisabledFunc
    ),
    {
      type: "checkbox",
      name: localization["droppedBy"],
      tooltip:
        tostring(localization["droppedBy"]) +
        "/" +
        tostring(localization["boss"]) +
        "/" +
        GetString(SI_CHARACTER_SELECT_LOCATION_LABEL),
      getFunc: (): unknown => tt["addBossName"],
      setFunc: (value: unknown): undefined => {
        asStrRecord(sv["tooltipModifications"])["addBossName"] = value
        lib.IsLibSetsTooltipEnabled()
      },
      default: dtt["addBossName"],
      disabled: tooltipLAMDisabledFunc,
      width: "full",
    },
    {
      type: "checkbox",
      name: localization["neededTraitsOrReconstructionCost"],
      tooltip: localization["neededTraitsOrReconstructionCost"],
      getFunc: (): unknown => tt["addNeededTraits"],
      setFunc: (value: unknown): undefined => {
        const tmods = asStrRecord(sv["tooltipModifications"])
        tmods["addNeededTraits"] = value
        tmods["addReconstructionCost"] = value
        lib.IsLibSetsTooltipEnabled()
      },
      default: dtt["addNeededTraits"],
      disabled: tooltipLAMDisabledFunc,
      width: "full",
    },
    lamToggle(
      localization["dlc"],
      localization["dlc"],
      tt,
      dtt,
      sv,
      "addDLC",
      tooltipLAMDisabledFunc
    ),
    lamToggle(
      localization["favorites"],
      localization["favorites"],
      tt,
      dtt,
      sv,
      "addFavorites",
      tooltipLAMDisabledFunc
    ),
    {
      type: "description",
      title: localization["customTooltipPattern"],
      text: localization["customTooltipPattern_TT"],
    },
    {
      type: "editbox",
      name: localization["customTooltipPattern"],
      tooltip: localization["customTooltipPattern"],
      getFunc: (): unknown => settings["useCustomTooltipPattern"],
      setFunc: (value: unknown): undefined => {
        let v = asString(value)
        STATE.useCustomTooltip = lib.IsLibSetsCustomTooltipEnabled(v)
        if (!STATE.useCustomTooltip) {
          v = ""
          settings["useCustomTooltipPattern"] = v
        } else {
          settings["useCustomTooltipPattern"] = v
        }
        lib.IsLibSetsTooltipEnabled()
      },
      default: defaultSettings["useCustomTooltipPattern"],
      reference: "TemperCraftingSets_LAM_EditBox_CustomTooltipPattern",
    },
    {
      type: "checkbox",
      name: localization["addLineBreakAtCustomTooltipParts"],
      tooltip: localization["addLineBreakAtCustomTooltipParts_TT"],
      getFunc: (): unknown => settings["addLineBreakAtCustomTooltipParts"],
      setFunc: (value: unknown): undefined => {
        STATE.addLineBreakAfterNonEmptyParts = asBoolean(value)
        sv["addLineBreakAtCustomTooltipParts"] = value
      },
      default: defaultSettings["addLineBreakAtCustomTooltipParts"],
      disabled: (): boolean => settings["useCustomTooltipPattern"] === undefined,
      width: "full",
    },
  ]
  lib.LAMsettingsPanel = registerPanel(lam, lamPanelName, panelData, optionsTable)
  MENU_STATE.settingsMenuCreated.set(false, true)
  return undefined
}

asTyped<{ [slot: string]: unknown }>(lib)["_loadLAMSettingsMenu"] = loadLAMSettingsMenu
