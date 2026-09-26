import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { prominentSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function sunspireSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Sunspire",
      controls: prominentSettings(1121, [
        {
          type: "checkbox",
          name: "Show Lokkestiiz HM beam position icons",
          tooltip:
            "During flight phase on Lokkestiiz hardmode, shows 1~8 DPS and 2 healer positions in the world for Storm Fury",
          default: true,
          getFunc: () => CRUTCH.savedOptions.sunspire.showLokkIcons,
          setFunc: (value) => {
            CRUTCH.savedOptions.sunspire.showLokkIcons = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "    Lokkestiiz solo heal icons",
          tooltip:
            "Use solo healer positions for the Lokkestiiz hardmode icons. This is for 9 damage dealers and 1 healer. If you change this option while at the Lokkestiiz fight, the new icons will show up the next time icons are displayed",
          default: false,
          getFunc: () => CRUTCH.savedOptions.sunspire.lokkIconsSoloHeal,
          setFunc: (value) => {
            CRUTCH.savedOptions.sunspire.lokkIconsSoloHeal = value
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.sunspire.showLokkIcons,
        },
        {
          type: "slider",
          name: "Lokkestiiz HM icons size",
          tooltip: "Updated size will show after the icons are hidden and shown again",
          min: 20,
          max: 300,
          step: 10,
          default: 150,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.sunspire.lokkIconsSize,
          setFunc: (value) => {
            CRUTCH.savedOptions.sunspire.lokkIconsSize = value
          },
          disabled: () => !CRUTCH.savedOptions.sunspire.showLokkIcons,
        },
        {
          type: "checkbox",
          name: "Show some Lokkestiiz HM Storm Breath telegraphs",
          tooltip:
            "During flight phase on Lokkestiiz hardmode, shows approximate telegraphs for some of the Storm Breaths and Storm Trails afterwards, mainly the ones that people tend to stand in...",
          default: false,
          getFunc: () => CRUTCH.savedOptions.sunspire.telegraphStormBreath,
          setFunc: (value) => {
            CRUTCH.savedOptions.sunspire.telegraphStormBreath = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Yolnahkriin position icons",
          tooltip:
            "During flight phase on Yolnahkriin, shows icons in the world for where the next head stack and (right) wing stack will be when Yolnahkriin lands",
          default: true,
          getFunc: () => CRUTCH.savedOptions.sunspire.showYolIcons,
          setFunc: (value) => {
            CRUTCH.savedOptions.sunspire.showYolIcons = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "    Yolnahkriin left position icons",
          tooltip: "Use left icons instead of right icons during flight phase on Yolnahkriin",
          default: false,
          getFunc: () => CRUTCH.savedOptions.sunspire.yolLeftIcons,
          setFunc: (value) => {
            CRUTCH.savedOptions.sunspire.yolLeftIcons = value
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.sunspire.showYolIcons,
        },
        {
          type: "slider",
          name: "Yolnahkriin icons size",
          min: 20,
          max: 300,
          step: 10,
          default: 150,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.sunspire.yolIconsSize,
          setFunc: (value) => {
            CRUTCH.savedOptions.sunspire.yolIconsSize = value
          },
          disabled: () => !CRUTCH.savedOptions.sunspire.showYolIcons,
        },
        {
          type: "checkbox",
          name: "Show players without Focused Fire",
          tooltip:
            "When Yolnahkriin starts casting Focus Fire, show icons above players who do not have the Focused Fire debuff. This is mainly to help the OT not go to the wrong stack",
          default: true,
          getFunc: () => CRUTCH.savedOptions.sunspire.yolFocusedFire,
          setFunc: (value) => {
            CRUTCH.savedOptions.sunspire.yolFocusedFire = value
          },
          width: "full",
        },
        {
          type: "description",
          title: "|c08BD1DInfo Panel|r",
          text: "Shows timers or other info in a consolidated panel. Unlock the UI or |c99FF99/crutch unlock|r to reposition the info panel.",
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show time until Focus Fire",
          tooltip: "Shows the time until Yolnahkriin may cast Focus Fire AKA Flare",
          default: CRUTCH.defaultOptions.sunspire.panel.showFocusFire,
          getFunc: () => CRUTCH.savedOptions.sunspire.panel.showFocusFire,
          setFunc: (value) => {
            CRUTCH.savedOptions.sunspire.panel.showFocusFire = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show next Eternal Servant mechanic",
          tooltip:
            "Shows the upcoming Eternal Servant mechanics in Nahviintaas portal. Note: if you enter portal much later than the first person, the first few mechanics shown may be incorrect as it catches up",
          default: CRUTCH.defaultOptions.sunspire.panel.showPortalNext,
          getFunc: () => CRUTCH.savedOptions.sunspire.panel.showPortalNext,
          setFunc: (value) => {
            CRUTCH.savedOptions.sunspire.panel.showPortalNext = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
      ]),
    },
  ]
}
