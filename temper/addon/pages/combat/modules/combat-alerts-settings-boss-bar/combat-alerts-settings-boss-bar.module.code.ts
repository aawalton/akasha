import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import {
  colorDef,
  unpackColor,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-settings-state/combat-alerts-settings-state.module.code.ts"

export function bossHealthBarSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Vertical Boss Health Bar",
      controls: [
        {
          type: "checkbox",
          name: "Show boss health bar",
          tooltip: "Show vertical boss health bars with markers for percentage based mechanics",
          default: true,
          getFunc: () => CRUTCH.savedOptions.bossHealthBar.enabled,
          setFunc: (value) => {
            CRUTCH.savedOptions.bossHealthBar.enabled = value
            CRUTCH.BossHealthBar.Initialize()
            CRUTCH.BossHealthBar.UpdateScale()
            TemperCombatAlertsBossHealthBarContainer.SetHidden(!value)
            CRUTCH.BossHealthBar.ShowOrHideBars(true)
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Use horizontal bars",
          tooltip:
            "Show the boss health bars from left to right instead of vertical. Warning: this is just a naive UI element rotation with some adjustments, so there may be things that display weirdly",
          default: false,
          getFunc: () => CRUTCH.savedOptions.bossHealthBar.horizontal,
          setFunc: (value) => {
            CRUTCH.savedOptions.bossHealthBar.horizontal = value
            CRUTCH.BossHealthBar.UpdateRotation(true)
            TemperCombatAlertsBossHealthBarContainer.SetHidden(false)
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.bossHealthBar.enabled,
        },
        {
          type: "slider",
          name: "Size",
          tooltip:
            "The size to display the vertical boss health bars. Note: some elements may not update size properly until a reload",
          min: 5,
          max: 20,
          step: 1,
          default: 10,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.bossHealthBar.scale * 10,
          setFunc: (value) => {
            CRUTCH.savedOptions.bossHealthBar.scale = value / 10
            CRUTCH.BossHealthBar.UpdateScale()
            TemperCombatAlertsBossHealthBarContainer.SetHidden(false)
          },
          disabled: () => !CRUTCH.savedOptions.bossHealthBar.enabled,
        },
        {
          type: "colorpicker",
          name: "Foreground color",
          tooltip:
            "Foreground color of the bars. Does not apply to special cases like OC titans and AS minis. Note that this color includes opacity, so it may appear darker in the settings menu than it actually is",
          default: colorDef(CRUTCH.defaultOptions.bossHealthBar.foreground),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.bossHealthBar.foreground)
          },
          setFunc: (r, g, b, a) => {
            CRUTCH.savedOptions.bossHealthBar.foreground = [r, g, b, a] as number[]
            CRUTCH.BossHealthBar.UpdateColors()
            TemperCombatAlertsBossHealthBarContainer.SetHidden(false)
          },
          width: "half",
        },
        {
          type: "colorpicker",
          name: "Background color",
          tooltip:
            "Background color of the bars. Does not apply to special cases like OC titans and AS minis. Note that this color includes opacity, so it may appear darker in the settings menu than it actually is",
          default: colorDef(CRUTCH.defaultOptions.bossHealthBar.background),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.bossHealthBar.background)
          },
          setFunc: (r, g, b, a) => {
            CRUTCH.savedOptions.bossHealthBar.background = [r, g, b, a] as number[]
            CRUTCH.BossHealthBar.UpdateColors()
            TemperCombatAlertsBossHealthBarContainer.SetHidden(false)
          },
          width: "half",
        },
        {
          type: "colorpicker",
          name: "Active threshold color",
          tooltip:
            "The color of the line and mechanic name when the current boss health is not near the threshold percentage. Note that this color includes opacity, so it may appear darker in the settings menu than it actually is",
          default: colorDef(CRUTCH.defaultOptions.bossHealthBar.activeColor),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.bossHealthBar.activeColor)
          },
          setFunc: (r, g, b, a) => {
            CRUTCH.savedOptions.bossHealthBar.activeColor = [r, g, b, a] as number[]
            CRUTCH.BossHealthBar.UpdateColors()
            TemperCombatAlertsBossHealthBarContainer.SetHidden(false)
          },
          width: "half",
        },
        {
          type: "colorpicker",
          name: "Imminent threshold color",
          tooltip:
            "The color of the line and mechanic name when the current boss health is near the threshold percentage. Note that this color includes opacity, so it may appear darker in the settings menu than it actually is",
          default: colorDef(CRUTCH.defaultOptions.bossHealthBar.imminentColor),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.bossHealthBar.imminentColor)
          },
          setFunc: (r, g, b, a) => {
            CRUTCH.savedOptions.bossHealthBar.imminentColor = [r, g, b, a] as number[]
            CRUTCH.BossHealthBar.UpdateColors()
            TemperCombatAlertsBossHealthBarContainer.SetHidden(false)
          },
          width: "half",
        },
        {
          type: "colorpicker",
          name: "Passed threshold color",
          tooltip:
            "The color of the line and mechanic name when the current boss health has passed the threshold percentage. Note that this color includes opacity, so it may appear darker in the settings menu than it actually is",
          default: colorDef(CRUTCH.defaultOptions.bossHealthBar.passedColor),
          getFunc: () => {
            return unpackColor(CRUTCH.savedOptions.bossHealthBar.passedColor)
          },
          setFunc: (r, g, b, a) => {
            CRUTCH.savedOptions.bossHealthBar.passedColor = [r, g, b, a] as number[]
            CRUTCH.BossHealthBar.UpdateColors()
            TemperCombatAlertsBossHealthBarContainer.SetHidden(false)
          },
          width: "half",
        },
        {
          type: "checkbox",
          name: 'Use "floor" rounding',
          tooltip:
            'Whether to use the "floor" or "half round up" rounding method to display boss health %.\n\nTurning this ON means the displayed health will be more accurate relative to the mechanic % labels.\n\nTurning this OFF means the displayed health will match the rest of the UI, including the default target attribute bars.\n\nFor more info on why this matters, see the WHY? below.',
          default: true,
          getFunc: () => CRUTCH.savedOptions.bossHealthBar.useFloorRounding,
          setFunc: (value) => {
            CRUTCH.savedOptions.bossHealthBar.useFloorRounding = value
          },
          disabled: () => !CRUTCH.savedOptions.bossHealthBar.enabled,
          width: "full",
        },
        {
          type: "submenu",
          name: "Rounding: Why?",
          controls: [
            {
              type: "description",
              text: 'Health-based mechanics typically happen at percentages like 50.999%, but the default UI and most addons use "zo_round" to round the displayed health percentage. This is the common rounding method, such that 50.4 is rounded to 50, and 50.5 is rounded to 51. That means when we say a mechanic happens at 50%, it could still be displaying 51% on your UI! But not all 51%s mean that the mechanic is going to trigger either, because 51% is actually anywhere from 50.5% to 51.499%\n\nTo fix this, the "floor" rounding option rounds any decimal down to the smaller integer. That means 50.999 is rounded to 50, which lines up with how boss mechanics appear to be triggered. I left the common rounding method as an option though, because some people may prefer to have consistency across their UI, even if the difference is only half a percentage.',
              width: "full",
            },
          ],
        },
      ],
    },
    {
      type: "submenu",
      name: "Info Panel",
      controls: [
        {
          type: "slider",
          name: "Size",
          tooltip:
            "The size to display the info panel. The info panel is used to display some timers or other info, such as when a boss can cast the next mechanic",
          min: 5,
          max: 120,
          step: 1,
          default: 30,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.infoPanel.size,
          setFunc: (value) => {
            CRUTCH.savedOptions.infoPanel.size = value
            CRUTCH.InfoPanel.ApplyStyle()
            TemperCombatAlertsInfoPanel.SetHidden(false)
            CRUTCH.InfoPanel.CountDownHardStop(998, "Info Panel Line 1", 10000, false)
            CRUTCH.InfoPanel.CountDownHardStop(999, "Portal 1: ", 10000, true)
          },
        },
      ],
    },
  ]
}
