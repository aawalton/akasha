import { updateRecentMessagesExpiry } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-alerts/quiet-alerts.module.code.ts"
import { DEFAULTS } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-defaults/quiet-defaults.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { header } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-settings-header/quiet-settings-header.module.code.ts"
import {
  craftResultTooltip,
  mobImmuneTooltip,
  STRINGS,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-strings/quiet-strings.module.code.ts"
import { dropdown } from "akasha/temper/addon/shared/settings-panel/modules/dropdown/dropdown.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"

export function buildMessageSections(this: void): LamControlData[] {
  const savedVars = getSavedVariables()
  return [
    header(STRINGS.QUIET_AVA_HEADER),
    dropdown({
      name: STRINGS.QUIET_AVA,
      tooltip: STRINGS.QUIET_AVA_TOOLTIP,
      choices: STRINGS.AVA_MODE_OPTION,
      get: () => savedVars.ava,
      set: (index) => {
        savedVars.ava = index
      },
      defaultIndex: DEFAULTS.ava,
    }),
    header(STRINGS.QUIET_GROUPZONE_HEADER),
    dropdown({
      name: STRINGS.QUIET_GROUPZONE,
      tooltip: STRINGS.QUIET_GROUPZONE_TOOLTIP,
      choices: STRINGS.AVA_MODE_OPTION,
      get: () => savedVars.groupZone,
      set: (index) => {
        savedVars.groupZone = index
      },
      defaultIndex: DEFAULTS.groupZone,
    }),
    header(STRINGS.QUIET_FRIENDS_HEADER),
    {
      type: "checkbox",
      name: STRINGS.QUIET_FRIENDS_ACTIVITY,
      tooltip: STRINGS.QUIET_FRIENDS_ACTIVITY_TOOLTIP,
      getFunc: () => savedVars.friends,
      setFunc: (value) => {
        savedVars.friends = value
      },
      default: DEFAULTS.friends,
    },
    header(STRINGS.QUIET_TEXT_ALERTS_HEADER),
    {
      type: "checkbox",
      name: STRINGS.QUIET_MOB_IMMUNE,
      tooltip: mobImmuneTooltip(),
      getFunc: () => savedVars.boss,
      setFunc: (value) => {
        savedVars.boss = value
      },
      default: DEFAULTS.boss,
    },
    {
      type: "checkbox",
      name: STRINGS.QUIET_SCREENSHOT,
      tooltip: STRINGS.QUIET_SCREENSHOT_TOOLTIP,
      getFunc: () => savedVars.screenshot,
      setFunc: (value) => {
        savedVars.screenshot = value
      },
      default: DEFAULTS.screenshot,
    },
    {
      type: "checkbox",
      name: STRINGS.QUIET_ENLIGHTENED,
      tooltip: STRINGS.QUIET_ENLIGHTENED_TOOLTIP,
      getFunc: () => savedVars.enlightened,
      setFunc: (value) => {
        savedVars.enlightened = value
      },
      default: DEFAULTS.enlightened,
      disabled: () => !IsEnlightenedAvailableForCharacter(),
    },
    {
      type: "checkbox",
      name: STRINGS.QUIET_CRAFTRESULT,
      tooltip: craftResultTooltip(),
      getFunc: () => savedVars.craftingResults,
      setFunc: (value) => {
        savedVars.craftingResults = value
      },
      default: DEFAULTS.craftingResults,
    },
    {
      type: "checkbox",
      name: STRINGS.QUIET_REPAIR,
      tooltip: STRINGS.QUIET_REPAIR_TOOLTIP,
      getFunc: () => savedVars.repair,
      setFunc: (value) => {
        savedVars.repair = value
      },
      default: DEFAULTS.repair,
      disabled: () => ZO_GamepadStoreManager === undefined,
    },
    {
      type: "slider",
      name: STRINGS.QUIET_ALERT_THROTTLING,
      tooltip: STRINGS.QUIET_ALERT_THROTTLING_TOOLTIP,
      min: 3,
      max: 30,
      getFunc: () => savedVars.alertTextExpiryDelay,
      setFunc: (value) => {
        savedVars.alertTextExpiryDelay = value
        updateRecentMessagesExpiry(value)
      },
      default: DEFAULTS.alertTextExpiryDelay,
    },
    header(STRINGS.QUIET_SOUND_HEADER),
    dropdown({
      name: STRINGS.QUIET_ULTISOUND,
      tooltip: STRINGS.QUIET_ULTISOUND_TOOLTIP,
      choices: STRINGS.SOUND_MODE_OPTION,
      get: () => savedVars.ultimateSound,
      set: (index) => {
        savedVars.ultimateSound = index
      },
      defaultIndex: DEFAULTS.ultimateSound,
    }),
  ]
}
