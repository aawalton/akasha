import {
  changeCombatLogLabel,
  initializeChat,
  removeCombatLog,
} from "@akasha/temper-combat-addon/combat-core-events"
import { setPenetrationDebuffValue } from "@akasha/temper-combat-addon/combat-data-tables"
import type { TemperCombatSettings } from "@akasha/temper-combat-addon/combat-saved-variables"
import { resizeLiveReport } from "@akasha/temper-combat-addon/combat-ui-live-refresh"
import {
  setLiveReportBgAlpha,
  setLiveReportLocked,
  toggleLiveReport,
  updateLiveReport,
} from "@akasha/temper-combat-addon/combat-ui-live-report"

export function buildMenuOptionsTail(
  db: TemperCombatSettings,
  def: TemperCombatSettings
): LamControlData[] {
  const options: LamControlData[] = [
    {
      type: "header",
      name: GetString(SI_TEMPER_COMBAT_MENU_RESPEN_NAME),
    },
    {
      type: "editbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_CRUSHER),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_CRUSHER_TOOLTIP),
      default: def.crusherValue,
      getFunc: () => db.crusherValue,
      setFunc: (value) => {
        if (value != null) {
          const number = zo_round(tonumber(value) ?? def.crusherValue)
          setPenetrationDebuffValue("crusherValue", number)
        }
      },
    },
    {
      type: "editbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_ALKOSH),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_ALKOSH_TOOLTIP),
      default: def.alkoshValue,
      getFunc: () => db.alkoshValue,
      setFunc: (value) => {
        if (value != null) {
          const number = zo_round(tonumber(value) ?? def.alkoshValue)
          setPenetrationDebuffValue("alkoshValue", number)
        }
      },
    },
    {
      type: "editbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_TREMORSCALE),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_TREMORSCALE_TOOLTIP),
      default: def.tremorscaleValue,
      getFunc: () => db.tremorscaleValue,
      setFunc: (value) => {
        if (value != null) {
          const number = zo_round(tonumber(value) ?? def.tremorscaleValue)
          setPenetrationDebuffValue("tremorscaleValue", number)
        }
      },
    },
    {
      type: "editbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_MOBRESISTANCE),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_MOBRESISTANCE_TOOLTIP),
      default: def.unitresistance,
      getFunc: () => db.unitresistance,
      setFunc: (value) => {
        if (value != null) {
          const number = zo_round(tonumber(value) ?? def.unitresistance)
          db.unitresistance = number
        }
      },
    },
    {
      type: "header",
      name: GetString(SI_TEMPER_COMBAT_MENU_LR_NAME),
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_ENABLE_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_ENABLE_TOOLTIP),
      default: def.liveReport.enabled,
      getFunc: () => db.liveReport.enabled,
      setFunc: (value) => {
        db.liveReport.enabled = value
        toggleLiveReport(value)
      },
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_LR_LOCK),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_LR_LOCK_TOOLTIP),
      default: def.liveReport.locked,
      getFunc: () => db.liveReport.locked,
      setFunc: (value) => {
        setLiveReportLocked(value)
        db.liveReport.locked = value
      },
    },
    {
      type: "dropdown",
      name: GetString(SI_TEMPER_COMBAT_MENU_LAYOUT_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_LAYOUT_TOOLTIP),
      default: def.liveReport.layout,
      choices: ["Compact", "Horizontal", "Vertical"],
      getFunc: () => db.liveReport.layout,
      setFunc: (value) => {
        db.liveReport.layout = tostring(value)
        updateLiveReport()
      },
      disabled: () => !db.liveReport.enabled,
    },
    {
      type: "slider",
      name: GetString(SI_TEMPER_COMBAT_MENU_SCALE_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_SCALE_TOOLTIP),
      min: 50,
      max: 300,
      step: 10,
      default: def.liveReport.scale * 100,
      getFunc: () => db.liveReport.scale * 100,
      setFunc: (value) => {
        db.liveReport.scale = value / 100
        resizeLiveReport(value / 100)
      },
      disabled: () => !db.liveReport.enabled,
    },
    {
      type: "slider",
      name: GetString(SI_TEMPER_COMBAT_MENU_BGALPHA_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_BGALPHA_TOOLTIP),
      min: 0,
      max: 100,
      step: 1,
      default: def.liveReport.bgalpha,
      getFunc: () => db.liveReport.bgalpha,
      setFunc: (value) => {
        db.liveReport.bgalpha = value
        setLiveReportBgAlpha(value / 100)
      },
      disabled: () => !db.liveReport.enabled,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_LR_ALIGNMENT),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_LR_ALIGNMENT_TOOLTIP),
      default: def.liveReport.alignmentleft,
      getFunc: () => db.liveReport.alignmentleft,
      setFunc: (value) => {
        db.liveReport.alignmentleft = value
        updateLiveReport()
      },
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_SHOW_DPS_NAME),
      width: "half",
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_SHOW_DPS_TOOLTIP),
      default: def.liveReport.damageOut,
      getFunc: () => db.liveReport.damageOut,
      setFunc: (value) => {
        db.liveReport.damageOut = value
        updateLiveReport()
      },
      disabled: () => !db.liveReport.enabled,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_SHOW_SDPS_NAME),
      width: "half",
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_SHOW_SDPS_TOOLTIP),
      default: def.liveReport.damageOutSingle,
      getFunc: () => db.liveReport.damageOutSingle,
      setFunc: (value) => {
        db.liveReport.damageOutSingle = value
        updateLiveReport()
      },
      disabled: () => !db.liveReport.enabled,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_SHOW_HPSA_NAME),
      width: "half",
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_SHOW_HPSA_TOOLTIP),
      default: def.liveReport.healOutAbsolute,
      getFunc: () => db.liveReport.healOutAbsolute,
      setFunc: (value) => {
        db.liveReport.healOutAbsolute = value
        updateLiveReport()
      },
      disabled: () => !db.liveReport.enabled,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_SHOW_HPS_NAME),
      width: "half",
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_SHOW_HPS_TOOLTIP),
      default: def.liveReport.healOut,
      getFunc: () => db.liveReport.healOut,
      setFunc: (value) => {
        db.liveReport.healOut = value
        updateLiveReport()
      },
      disabled: () => !db.liveReport.enabled,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_SHOW_INC_DPS_NAME),
      width: "half",
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_SHOW_INC_DPS_TOOLTIP),
      default: def.liveReport.damageIn,
      getFunc: () => db.liveReport.damageIn,
      setFunc: (value) => {
        db.liveReport.damageIn = value
        updateLiveReport()
      },
      disabled: () => !db.liveReport.enabled,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_SHOW_INC_HPS_NAME),
      width: "half",
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_SHOW_INC_HPS_TOOLTIP),
      default: def.liveReport.healIn,
      getFunc: () => db.liveReport.healIn,
      setFunc: (value) => {
        db.liveReport.healIn = value
        updateLiveReport()
      },
      disabled: () => !db.liveReport.enabled,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_SHOW_TIME_NAME),
      width: "half",
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_SHOW_TIME_TOOLTIP),
      default: def.liveReport.time,
      getFunc: () => db.liveReport.time,
      setFunc: (value) => {
        db.liveReport.time = value
        updateLiveReport()
      },
      disabled: () => !db.liveReport.enabled,
    },
    {
      type: "custom",
      width: "half",
    },
    {
      type: "custom",
    },
    {
      type: "header",
      name: GetString(SI_TEMPER_COMBAT_MENU_CHAT_TITLE),
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_ENABLE_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_CHAT_DH_TOOLTIP),
      default: def.chatLog.enabled,
      warning: GetString(SI_TEMPER_COMBAT_MENU_CHAT_WARNING),
      getFunc: () => db.chatLog.enabled,
      setFunc: (value) => {
        if (value) {
          initializeChat()
        } else {
          removeCombatLog()
        }
        db.chatLog.enabled = value
      },
    },
    {
      type: "editbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_CHAT_TITLE_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_CHAT_TITLE_TOOLTIP),
      default: def.chatLog.name,
      getFunc: () => db.chatLog.name,
      setFunc: (value) => {
        if (value != null) {
          changeCombatLogLabel(value)
        }
        db.chatLog.name = value
      },
      disabled: () => !db.chatLog.enabled,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_CHAT_SD_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_CHAT_SD_TOOLTIP),
      default: def.chatLog.damageOut,
      getFunc: () => db.chatLog.damageOut,
      setFunc: (value) => {
        db.chatLog.damageOut = value
      },
      disabled: () => !db.chatLog.enabled,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_CHAT_SH_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_CHAT_SH_TOOLTIP),
      default: def.chatLog.healingOut,
      getFunc: () => db.chatLog.healingOut,
      setFunc: (value) => {
        db.chatLog.healingOut = value
      },
      disabled: () => !db.chatLog.enabled,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_CHAT_SID_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_CHAT_SID_TOOLTIP),
      default: def.chatLog.damageIn,
      getFunc: () => db.chatLog.damageIn,
      setFunc: (value) => {
        db.chatLog.damageIn = value
      },
      disabled: () => !db.chatLog.enabled,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_COMBAT_MENU_CHAT_SIH_NAME),
      tooltip: GetString(SI_TEMPER_COMBAT_MENU_CHAT_SIH_TOOLTIP),
      default: def.chatLog.healingIn,
      getFunc: () => db.chatLog.healingIn,
      setFunc: (value) => {
        db.chatLog.healingIn = value
      },
      disabled: () => !db.chatLog.enabled,
    },
    {
      type: "custom",
    },
  ]

  return options
}
