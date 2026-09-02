import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { ACCOUNT_INIT } from "../craft-account-init/craft-account-init.module.code.ts"
import { optionSet, styleInitialize } from "../craft-options/craft-options.module.code.ts"
import {
  dropdownSettingsUpdate,
  settingFromIndex,
  settingsUpdate,
  updateGridPerSettings,
} from "../craft-set-updates/craft-set-updates.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

const LAM = LibAddonMenu2

export const PANEL_DATA: LamPanelData = {
  type: "panel",
  name: STATE.Title,
  displayName: STATE.Title,
  version: STATE.Version,
  slashCommand: "/tcoptions",
  registerForRefresh: true,
  registerForDefaults: true,
}

export const OPTIONS_TABLE: LamControlData[] = [
  {
    type: "header",
    name: "UI Settings",
    width: "full",
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.showbutton,
    tooltip: "",
    getFunc: () => STATE.Account.options.showbutton,
    setFunc: (value) => {
      settingsUpdate("showbutton", value)
      optionSet()
    },
    default: ACCOUNT_INIT.options.showbutton,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.lockbutton,
    tooltip: "",
    getFunc: () => STATE.Account.options.lockbutton,
    setFunc: (value) => {
      settingsUpdate("lockbutton", value)
      optionSet()
    },
    default: ACCOUNT_INIT.options.lockbutton,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.lockelements,
    tooltip: "",
    getFunc: () => STATE.Account.options.lockelements,
    setFunc: (value) => {
      settingsUpdate("lockelements", value)
      optionSet()
    },
    default: ACCOUNT_INIT.options.lockelements,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.closeonmove,
    tooltip: "",
    getFunc: () => STATE.Account.options.closeonmove,
    setFunc: (value) => settingsUpdate("closeonmove", value),
    default: ACCOUNT_INIT.options.closeonmove,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.useartisan,
    tooltip: "",
    getFunc: () => STATE.Account.options.useartisan,
    setFunc: (value) => settingsUpdate("useartisan", value),
    default: ACCOUNT_INIT.options.useartisan,
    disabled: true,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.useflask,
    tooltip: "",
    getFunc: () => STATE.Account.options.useflask,
    setFunc: (value) => settingsUpdate("useflask", value),
    default: ACCOUNT_INIT.options.useflask,
    disabled: true,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.usequest,
    tooltip: STATE.Loc.options.usequestTooltip,
    getFunc: () => STATE.Account.options.usequest,
    setFunc: (value) => settingsUpdate("usequest", value),
    default: ACCOUNT_INIT.options.usequest,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.usecook,
    tooltip: STATE.Loc.options.usecookTooltip,
    getFunc: () => STATE.Account.options.usecook,
    setFunc: (value) => settingsUpdate("usecook", value),
    default: ACCOUNT_INIT.options.usecook,
  },
  {
    type: "dropdown",
    name: STATE.Loc.options.overviewstyle,
    tooltip: "",
    choices: STATE.Loc.suboptions.overviewstyle,
    getFunc: () => settingFromIndex("overviewstyle", STATE.Account.options.overviewstyle),
    setFunc: (value) => dropdownSettingsUpdate("overviewstyle", value as never),
    default: settingFromIndex("overviewstyle", ACCOUNT_INIT.options.overviewstyle),
    warning: STATE.Loc.reload,
  },
  {
    type: "header",
    name: "Rune Settings",
    width: "full",
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.userune,
    tooltip: STATE.Loc.options.useruneTooltip,
    getFunc: () => STATE.Account.options.userune,
    setFunc: (value) => settingsUpdate("userune", value),
    default: ACCOUNT_INIT.options.userune,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.userunecreation,
    tooltip: STATE.Loc.options.userunecreationTooltip,
    getFunc: () => STATE.Account.options.userunecreation,
    setFunc: (value) => settingsUpdate("userunecreation", value),
    default: ACCOUNT_INIT.options.userunecreation,
    disabled: () => !STATE.Account.options.userune,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.useruneextraction,
    tooltip: STATE.Loc.options.useruneextractionTooltip,
    getFunc: () => STATE.Account.options.useruneextraction,
    setFunc: (value) => settingsUpdate("useruneextraction", value),
    default: ACCOUNT_INIT.options.useruneextraction,
    disabled: () => !STATE.Account.options.userune,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.userunerecipe,
    tooltip: STATE.Loc.options.userunerecipeTooltip,
    getFunc: () => STATE.Account.options.userunerecipe,
    setFunc: (value) => settingsUpdate("userunerecipe", value),
    default: ACCOUNT_INIT.options.userunerecipe,
    disabled: () => !STATE.Account.options.userune,
  },
  {
    type: "header",
    name: "Item Settings",
    width: "full",
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.markitems,
    tooltip: "",
    getFunc: () => STATE.Account.options.markitems,
    setFunc: (value) => settingsUpdate("markitems", value),
    default: ACCOUNT_INIT.options.markitems,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.showsymbols,
    tooltip: "",
    getFunc: () => STATE.Account.options.showsymbols,
    setFunc: (value) => settingsUpdate("showsymbols", value),
    default: ACCOUNT_INIT.options.showsymbols,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.marksetitems,
    tooltip: "",
    getFunc: () => STATE.Account.options.marksetitems,
    setFunc: (value) => {
      settingsUpdate("marksetitems", value)
      updateGridPerSettings()
    },
    default: ACCOUNT_INIT.options.marksetitems,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.stacksplit,
    tooltip: "",
    getFunc: () => STATE.Account.options.stacksplit,
    setFunc: (value) => settingsUpdate("stacksplit", value),
    default: ACCOUNT_INIT.options.stacksplit,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.markduplicates,
    tooltip: "",
    getFunc: () => STATE.Account.options.markduplicates,
    setFunc: (value) => settingsUpdate("markduplicates", value),
    default: ACCOUNT_INIT.options.markduplicates,
  },
  {
    type: "header",
    name: "Alarm Settings",
    width: "full",
  },
  {
    type: "dropdown",
    name: STATE.Loc.options.timeralarm,
    tooltip: "",
    choices: STATE.Loc.suboptions.alarms,
    getFunc: () => settingFromIndex("alarms", STATE.Account.options.timeralarm),
    setFunc: (value) => dropdownSettingsUpdate("timeralarm", value as never, "alarms"),
    default: settingFromIndex("alarms", ACCOUNT_INIT.options.timeralarm),
  },
  {
    type: "dropdown",
    name: STATE.Loc.options.mountalarm,
    tooltip: "",
    choices: STATE.Loc.suboptions.alarms,
    getFunc: () => settingFromIndex("alarms", STATE.Account.options.mountalarm),
    setFunc: (value) => dropdownSettingsUpdate("mountalarm", value as never, "alarms"),
    default: settingFromIndex("alarms", ACCOUNT_INIT.options.mountalarm),
  },
  {
    type: "dropdown",
    name: STATE.Loc.options.researchalarm,
    tooltip: "",
    choices: STATE.Loc.suboptions.alarms,
    getFunc: () => settingFromIndex("alarms", STATE.Account.options.researchalarm),
    setFunc: (value) => dropdownSettingsUpdate("researchalarm", value as never, "alarms"),
    default: settingFromIndex("alarms", ACCOUNT_INIT.options.researchalarm),
  },
  {
    type: "header",
    name: "Tooltip Settings",
    width: "full",
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.displayrunelevel,
    tooltip: "",
    getFunc: () => STATE.Account.options.displayrunelevel,
    setFunc: (value) => settingsUpdate("displayrunelevel", value),
    default: ACCOUNT_INIT.options.displayrunelevel,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.displaymm,
    tooltip: "",
    getFunc: () => STATE.Account.options.displaymm,
    setFunc: (value) => settingsUpdate("displaymm", value),
    default: ACCOUNT_INIT.options.displaymm,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.displayttc,
    tooltip: "",
    getFunc: () => STATE.Account.options.displayttc,
    setFunc: (value) => settingsUpdate("displayttc", value),
    default: ACCOUNT_INIT.options.displayttc,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.displaystyles,
    tooltip: "",
    getFunc: () => STATE.Account.options.displaystyles,
    setFunc: (value) => settingsUpdate("displaystyles", value),
    default: ACCOUNT_INIT.options.displaystyles,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.showstock,
    tooltip: "",
    getFunc: () => STATE.Account.options.showstock,
    setFunc: (value) => settingsUpdate("showstock", value),
    default: ACCOUNT_INIT.options.showstock,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.displayunknown,
    tooltip: "",
    getFunc: () => STATE.Account.options.displayunknown,
    setFunc: (value) => settingsUpdate("displayunknown", value),
    default: ACCOUNT_INIT.options.displayunknown,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.displayknown,
    tooltip: "",
    getFunc: () => STATE.Account.options.displayknown,
    setFunc: (value) => settingsUpdate("displayknown", value),
    default: ACCOUNT_INIT.options.displayknown,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.displaycount,
    tooltip: "",
    getFunc: () => STATE.Account.options.displaycount,
    setFunc: (value) => settingsUpdate("displaycount", value),
    default: ACCOUNT_INIT.options.displaycount,
  },
  {
    type: "header",
    name: "Misc Settings",
    width: "full",
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.playrunevoice,
    tooltip: "",
    getFunc: () => STATE.Account.options.playrunevoice,
    setFunc: (value) => settingsUpdate("playrunevoice", value),
    default: ACCOUNT_INIT.options.playrunevoice,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.advancedcolorgrid,
    tooltip: "",
    getFunc: () => STATE.Account.options.advancedcolorgrid,
    setFunc: (value) => {
      settingsUpdate("advancedcolorgrid", value)
      updateGridPerSettings()
    },
    default: ACCOUNT_INIT.options.advancedcolorgrid,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.lockprotection,
    tooltip: "",
    getFunc: () => STATE.Account.options.lockprotection,
    setFunc: (value) => settingsUpdate("lockprotection", value),
    default: ACCOUNT_INIT.options.lockprotection,
  },
  {
    type: "checkbox",
    name: STATE.Loc.options.inspirationgain,
    tooltip: "",
    getFunc: () => STATE.Account.options.inspirationgain,
    setFunc: (value) => settingsUpdate("inspirationgain", value),
    default: ACCOUNT_INIT.options.inspirationgain,
  },
  {
    type: "dropdown",
    name: STATE.Loc.options.sortsets,
    tooltip: "",
    choices: STATE.Loc.suboptions.sortsets,
    getFunc: () => settingFromIndex("sortsets", STATE.Account.options.sortsets),
    setFunc: (value) => dropdownSettingsUpdate("sortsets", value as never),
    default: settingFromIndex("sortsets", ACCOUNT_INIT.options.sortsets),
  },
  {
    type: "dropdown",
    name: STATE.Loc.options.sortstyles,
    tooltip: "",
    choices: STATE.Loc.suboptions.sortstyles,
    getFunc: () => settingFromIndex("sortstyles", STATE.Account.options.sortstyles),
    setFunc: (value) => {
      dropdownSettingsUpdate("sortstyles", value as never)
      styleInitialize()
    },
    default: settingFromIndex("sortstyles", ACCOUNT_INIT.options.sortstyles),
  },
  {
    type: "editbox",
    name: STATE.Loc.options.bulkcraftlimit,
    tooltip: "",
    isMultiline: false,
    getFunc: () => STATE.Account.options.bulkcraftlimit,
    setFunc: (value) =>
      settingsUpdate(
        "bulkcraftlimit",
        tonumber(value) ?? error("TemperCrafting: bulk craft limit must be a number")
      ),
    default: ACCOUNT_INIT.options.bulkcraftlimit,
  },
]

export function registerSettings(): Control {
  return registerPanel(LAM, STATE.Name, PANEL_DATA, OPTIONS_TABLE)
}
