import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { prominentSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function dreadsailSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Dreadsail Reef",
      controls: prominentSettings(1344, [
        {
          type: "checkbox",
          name: "Show brand sorting / stacking",
          tooltip:
            "When you get Firebrand or Frostbrand, shows your suggested stack partner and an icon for your stack spot. Idea credit to, and matching, Qcell's Dreadsail Reef Helper",
          default: true,
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.stackBrands,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.stackBrands = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Brewmaster elixirs",
          tooltip:
            "Displays icons on where the Dreadsail Brewmaster may have thrown Elixirs of Diminishing",
          default: true,
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.showElixirs,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.showElixirs = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Alert Building Static stacks",
          tooltip:
            "Displays a prominent alert and ding sound if you reach too many Building Static (lightning) stacks",
          default: true,
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.alertStaticStacks,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.alertStaticStacks = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "slider",
          name: "Building Static stacks threshold",
          tooltip: "The minimum number of stacks of Building Static to show alert for",
          min: 4,
          max: 20,
          step: 1,
          default: 7,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.staticThreshold,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.staticThreshold = value
          },
          disabled: () => !CRUTCH.savedOptions.dreadsailreef.alertStaticStacks,
        },
        {
          type: "checkbox",
          name: "Alert Volatile Residue stacks",
          tooltip:
            "Displays a prominent alert and ding sound if you reach too many Volatile Residue (poison) stacks",
          default: true,
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.alertVolatileStacks,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.alertVolatileStacks = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "slider",
          name: "Volatile Residue stacks threshold",
          tooltip: "The minimum number of stacks of Volatile Residue to show alert for",
          min: 4,
          max: 20,
          step: 1,
          default: 6,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.volatileThreshold,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.volatileThreshold = value
          },
          disabled: () => !CRUTCH.savedOptions.dreadsailreef.alertVolatileStacks,
        },
        {
          type: "checkbox",
          name: "Show Arcing Cleave guidelines",
          tooltip:
            "Draws guidelines approximating where Taleria's Arcing Cleave will hit. I'm tired of seeing people stand behind tank!",
          default: false,
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.showArcingCleave,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.showArcingCleave = value
            CRUTCH.TryEnablingTaleriaCleave()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Play sound for Lure of the Sea",
          tooltip:
            "Plays a sound when an Enthralling Matron (siren) starts casting the charm on you",
          default: true,
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.lureSound,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.lureSound = value
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
          name: "Show Maelstrom timer",
          tooltip: "Shows the approximate time until Taleria can cast Maelstrom",
          default: true,
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.infoPanel.showMaelstrom,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.infoPanel.showMaelstrom = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Winter Storm timer",
          tooltip: "Shows the approximate time until Taleria can cast Winter Storm",
          default: true,
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.infoPanel.showWinterStorm,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.infoPanel.showWinterStorm = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Summon Behemoth timer",
          tooltip: "Shows the approximate time until Taleria will summon a Behemoth",
          default: true,
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.infoPanel.showBehemothSpawn,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.infoPanel.showBehemothSpawn = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Summon Siren timer",
          tooltip: "Shows the approximate time until Taleria will summon Enthralling Matrons",
          default: true,
          getFunc: () => CRUTCH.savedOptions.dreadsailreef.infoPanel.showSirenSpawn,
          setFunc: (value) => {
            CRUTCH.savedOptions.dreadsailreef.infoPanel.showSirenSpawn = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
      ]),
    },
  ]
}
