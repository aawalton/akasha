import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import {
  prominentSettings,
  updateOCAbilitiesToReplace,
} from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function osseinSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Ossein Cage",
      controls: prominentSettings(1548, [
        {
          type: "checkbox",
          name: "Show group-wide Caustic Carrion",
          tooltip:
            "Shows a progress bar for the group member with the highest number (and tick progress) of Caustic Carrion stacks. Changes color based on number of stacks, with a lower threshold on Jynorah + Skorkhif at 5 stacks for red",
          default: true,
          getFunc: () => CRUTCH.savedOptions.osseincage.showCarrion,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.showCarrion = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "    Show additional group members",
          tooltip:
            "Shows additional debug-ish text under the Caustic Carrion progress bar for the stacks and tick time of all group members",
          default: false,
          getFunc: () => CRUTCH.savedOptions.osseincage.showCarrionIndividual,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.showCarrionIndividual = value
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.osseincage.showCarrion,
        },
        {
          type: "checkbox",
          name: "Show titans' health bars",
          tooltip:
            "Shows Blazeforged Valneer's and Sparkstorm Myrinax's health using the vertical boss health bars",
          default: true,
          getFunc: () => CRUTCH.savedOptions.osseincage.showTitansHp,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.showTitansHp = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.bossHealthBar.enabled,
        },
        {
          type: "checkbox",
          name: "Show curse positioning icons",
          tooltip:
            "In the Jynorah + Skorkhif fight, shows icons in the world for close positioning",
          default: true,
          getFunc: () => CRUTCH.savedOptions.osseincage.showTwinsIcons,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.showTwinsIcons = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "    Match AOCH icons",
          tooltip: "Use icons that match Asquart's Ossein Cage Helper's icons",
          default: false,
          getFunc: () => CRUTCH.savedOptions.osseincage.useAOCHIcons,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.useAOCHIcons = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.osseincage.showTwinsIcons,
        },
        {
          type: "checkbox",
          name: "    Show middle icons",
          tooltip: "Additionally shows a set of icons for positioning in the middle of the arena",
          default: CRUTCH.defaultOptions.osseincage.useMiddleIcons,
          getFunc: () => CRUTCH.savedOptions.osseincage.useMiddleIcons,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.useMiddleIcons = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.osseincage.showTwinsIcons,
        },
        {
          type: "slider",
          name: "    Curse positioning icons size",
          min: 20,
          max: 300,
          step: 10,
          default: 100,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.osseincage.twinsIconsSize,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.twinsIconsSize = value
            CRUTCH.OnPlayerActivated()
          },
          disabled: () => !CRUTCH.savedOptions.osseincage.showTwinsIcons,
        },
        {
          type: "dropdown",
          name: "Show Enfeeblement debuffs",
          tooltip:
            "Shows icons on players afflicted by Sparking Enfeeblement, Blazing Enfeeblement, or both",
          choices: ["Never", "Hardmode only", "Veteran + Hardmode", "Always"],
          choicesValues: ["NEVER", "HM", "VET", "ALWAYS"],
          default: "HM",
          getFunc: () => {
            return CRUTCH.savedOptions.osseincage.showEnfeeblementIcons
          },
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.showEnfeeblementIcons = value as string
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Print titan damage on HM",
          tooltip:
            "On hardmode, prints to chat when you damage a titan, which would proc Reflective Scales",
          default: true,
          getFunc: () => CRUTCH.savedOptions.osseincage.printHMReflectiveScales,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.printHMReflectiveScales = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "dropdown",
          name: "Show Stricken timer",
          tooltip:
            'Shows an "alert" timer for Stricken. If set to "Tank Only" it will display only if your LFG role is tank',
          choices: ["Never", "Tank Only", "Always"],
          choicesValues: ["NEVER", "TANK", "ALWAYS"],
          default: "TANK",
          getFunc: () => {
            return CRUTCH.savedOptions.osseincage.showStricken
          },
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.showStricken = value as string
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Dominator's Chains tether",
          tooltip:
            "Shows a line connecting group members who are about to (or have already received) the Dominator's Chains tether from Overfiend Kazpian",
          default: true,
          getFunc: () => CRUTCH.savedOptions.osseincage.showChains,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.showChains = value
            CRUTCH.OnPlayerActivated()
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
          name: "Show time until Titanic Leap",
          tooltip: "Shows an approximate time until the titans may leap again",
          default: CRUTCH.defaultOptions.osseincage.panel.showLeap,
          getFunc: () => CRUTCH.savedOptions.osseincage.panel.showLeap,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.panel.showLeap = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show timer for Titanic Clash",
          tooltip: "Shows the time until Titanic Clash would damage any remaining players",
          default: CRUTCH.defaultOptions.osseincage.panel.showClash,
          getFunc: () => CRUTCH.savedOptions.osseincage.panel.showClash,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.panel.showClash = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show target / portal on twins HM",
          tooltip:
            "On hardmode Jynorah + Skorkhif, shows text in the info panel indicating the side you should be on, as a non-tank. For example, if you got Sparking Enfeeblement on the first curse phase, it will display to target Skorkhif / go to orange portal, persisting through death, so you don't forget where you're going. This is based on the very first Enfeeblement you receive, alternating afterwards, so it could be incorrect if initial curses are assigned unusually",
          default: CRUTCH.defaultOptions.osseincage.panel.showTarget,
          getFunc: () => CRUTCH.savedOptions.osseincage.panel.showTarget,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.panel.showTarget = value
          },
          width: "full",
        },
        {
          type: "description",
          title: "|c08BD1DMark Dangerous Abilities|r",
          text: "Some AOE abilities are dangerous to have active when in Jynorah HM titan portals, because you may accidentally cleave the titan and cause Reflective Scales. This feature can be configured to show a warning icon on the ability when it's almost time for portal.",
          width: "full",
        },
        {
          type: "checkbox",
          name: "Enable portal ability overlay",
          tooltip: "Enables overlays on dangerous abilities before and during portals on hardmode",
          default: CRUTCH.defaultOptions.osseincage.enableAbilityOverlay,
          getFunc: () => CRUTCH.savedOptions.osseincage.enableAbilityOverlay,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.enableAbilityOverlay = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "editbox",
          name: "Add dangerous ability",
          tooltip:
            "The ID of the ability to add to the list.\nUse |c99FF99/crutch printskills|r to see your currently equipped skill IDs",
          default: "",
          getFunc: () => "",
          setFunc: (value) => {
            if (value === "") {
              return
            }
            const num = tonumber(value)
            if (num === undefined) {
              CRUTCH.msg("Ability ID must be a number")
              return
            }
            CRUTCH.savedOptions.osseincage.abilitiesToReplace[num] = true
            CRUTCH.msg(
              string.format("Added %s (%d) to abilities to replace.", GetAbilityName(num), num)
            )
          },
          width: "full",
          disabled: () => !CRUTCH.savedOptions.osseincage.enableAbilityOverlay,
        },
        {
          type: "dropdown",
          name: "Remove ability",
          tooltip: "Select an ability from this dropdown to remove it from the list",
          choices: [],
          choicesValues: [],
          getFunc: () => {
            updateOCAbilitiesToReplace()
            return undefined
          },
          setFunc: (value) => {
            delete CRUTCH.savedOptions.osseincage.abilitiesToReplace[value as number]
            CRUTCH.msg(
              string.format(
                "Removed %s(%d) from abilities to replace.",
                GetAbilityName(value as number),
                value
              )
            )
            updateOCAbilitiesToReplace()
          },
          width: "full",
          reference: "TemperCombatAlerts_OCAbilitiesToReplace",
          disabled: () => !CRUTCH.savedOptions.osseincage.enableAbilityOverlay,
        },
        {
          type: "slider",
          name: "Portal percent margin",
          tooltip:
            "The target health percent above the portal threshold for which the dangerous abilities start showing overlay icons. For example, setting it to 5 means that from Jynorah+Skorkhif combined health at 80% until Titanic Clash finishes, the overlays would show on your abilities",
          min: 0,
          max: 20,
          step: 1,
          default: 5,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.osseincage.portalPercentMargin,
          setFunc: (value) => {
            CRUTCH.savedOptions.osseincage.portalPercentMargin = value
          },
          disabled: () => !CRUTCH.savedOptions.osseincage.enableAbilityOverlay,
        },
      ]),
    },
  ]
}
