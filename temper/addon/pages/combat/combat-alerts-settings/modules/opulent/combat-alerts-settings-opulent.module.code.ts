import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { effectSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function opulentSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Opulent Ordeal",
      controls: effectSettings(1565, [
        {
          type: "checkbox",
          name: "Show Affinity icons",
          tooltip: "Shows icons above players' heads with their respective Affinity debuffs",
          default: true,
          getFunc: () => CRUTCH.savedOptions.opulentordeal.showAffinityIcons,
          setFunc: (value) => {
            CRUTCH.savedOptions.opulentordeal.showAffinityIcons = value
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
          name: "Show Essence timer",
          tooltip: "Shows which Essence is being run and the time until wipe",
          default: true,
          getFunc: () => CRUTCH.savedOptions.opulentordeal.showEssence,
          setFunc: (value) => {
            CRUTCH.savedOptions.opulentordeal.showEssence = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Essence announcement text",
          tooltip:
            'Writes the announcement text, e.g. "Web Eater Essence Appeared in the Eclipse," in the info panel. Note: other add-ons that interfere with center-screen announcements may conflict with this',
          default: true,
          getFunc: () => CRUTCH.savedOptions.opulentordeal.showFullText,
          setFunc: (value) => {
            CRUTCH.savedOptions.opulentordeal.showFullText = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Turn-brain-off mode",
          tooltip:
            "Shows the order of the areas the Essence must be relayed through, and the direction of the run. Note: other add-ons that interfere with center-screen announcements may conflict with this",
          default: false,
          getFunc: () => CRUTCH.savedOptions.opulentordeal.showBrainless,
          setFunc: (value) => {
            CRUTCH.savedOptions.opulentordeal.showBrainless = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Bombs timer",
          tooltip: "In the post-relay phase, shows approximate time until the next Bombs can occur",
          default: true,
          getFunc: () => CRUTCH.savedOptions.opulentordeal.showBombs,
          setFunc: (value) => {
            CRUTCH.savedOptions.opulentordeal.showBombs = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
      ]),
    },
  ]
}
