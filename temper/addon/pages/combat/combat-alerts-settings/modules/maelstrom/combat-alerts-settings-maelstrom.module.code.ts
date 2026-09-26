import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { prominentSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function maelstromSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Maelstrom Arena",
      controls: prominentSettings(677, [
        {
          type: "checkbox",
          name: "Show the current round",
          tooltip:
            "Displays a message in chat when a round starts. Also shows a message for final round soonTM, 15 seconds after the start of the second-to-last round",
          default: true,
          getFunc: () => CRUTCH.savedOptions.maelstrom.showRounds,
          setFunc: (value) => {
            CRUTCH.savedOptions.maelstrom.showRounds = value
          },
          width: "full",
        },
        {
          type: "editbox",
          name: "Stage 1 extra text",
          tooltip: "Extra text to display alongside the stage 1 final round soonTM alert",
          default: CRUTCH.defaultOptions.maelstrom.stage1Boss,
          getFunc: () => CRUTCH.savedOptions.maelstrom.stage1Boss,
          setFunc: (value) => {
            CRUTCH.savedOptions.maelstrom.stage1Boss = value
          },
          width: "full",
        },
        {
          type: "editbox",
          name: "Stage 2 extra text",
          tooltip: "Extra text to display alongside the stage 2 final round soonTM alert",
          default: CRUTCH.defaultOptions.maelstrom.stage2Boss,
          getFunc: () => CRUTCH.savedOptions.maelstrom.stage2Boss,
          setFunc: (value) => {
            CRUTCH.savedOptions.maelstrom.stage2Boss = value
          },
          width: "full",
        },
        {
          type: "editbox",
          name: "Stage 3 extra text",
          tooltip: "Extra text to display alongside the stage 3 final round soonTM alert",
          default: CRUTCH.defaultOptions.maelstrom.stage3Boss,
          getFunc: () => CRUTCH.savedOptions.maelstrom.stage3Boss,
          setFunc: (value) => {
            CRUTCH.savedOptions.maelstrom.stage3Boss = value
          },
          width: "full",
        },
        {
          type: "editbox",
          name: "Stage 4 extra text",
          tooltip: "Extra text to display alongside the stage 4 final round soonTM alert",
          default: CRUTCH.defaultOptions.maelstrom.stage4Boss,
          getFunc: () => CRUTCH.savedOptions.maelstrom.stage4Boss,
          setFunc: (value) => {
            CRUTCH.savedOptions.maelstrom.stage4Boss = value
          },
          width: "full",
        },
        {
          type: "editbox",
          name: "Stage 5 extra text",
          tooltip: "Extra text to display alongside the stage 5 final round soonTM alert",
          default: CRUTCH.defaultOptions.maelstrom.stage5Boss,
          getFunc: () => CRUTCH.savedOptions.maelstrom.stage5Boss,
          setFunc: (value) => {
            CRUTCH.savedOptions.maelstrom.stage5Boss = value
          },
          width: "full",
        },
        {
          type: "editbox",
          name: "Stage 6 extra text",
          tooltip: "Extra text to display alongside the stage 6 final round soonTM alert",
          default: CRUTCH.defaultOptions.maelstrom.stage6Boss,
          getFunc: () => CRUTCH.savedOptions.maelstrom.stage6Boss,
          setFunc: (value) => {
            CRUTCH.savedOptions.maelstrom.stage6Boss = value
          },
          width: "full",
        },
        {
          type: "editbox",
          name: "Stage 7 extra text",
          tooltip: "Extra text to display alongside the stage 7 final round soonTM alert",
          default: CRUTCH.defaultOptions.maelstrom.stage7Boss,
          getFunc: () => CRUTCH.savedOptions.maelstrom.stage7Boss,
          setFunc: (value) => {
            CRUTCH.savedOptions.maelstrom.stage7Boss = value
          },
          width: "full",
        },
        {
          type: "editbox",
          name: "Stage 8 extra text",
          tooltip: "Extra text to display alongside the stage 8 final round soonTM alert",
          default: CRUTCH.defaultOptions.maelstrom.stage8Boss,
          getFunc: () => CRUTCH.savedOptions.maelstrom.stage8Boss,
          setFunc: (value) => {
            CRUTCH.savedOptions.maelstrom.stage8Boss = value
          },
          width: "full",
        },
        {
          type: "editbox",
          name: "Stage 9 extra text",
          tooltip: "Extra text to display alongside the stage 9 final round soonTM alert",
          default: CRUTCH.defaultOptions.maelstrom.stage9Boss,
          getFunc: () => CRUTCH.savedOptions.maelstrom.stage9Boss,
          setFunc: (value) => {
            CRUTCH.savedOptions.maelstrom.stage9Boss = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Alert for NORMAL damage taken",
          tooltip:
            "Displays annoying text and rings alarm bells if you start taking damage to certain abilities in NORMAL Maelstrom Arena. This is to facilitate afk farming, notifying you if manual intervention is needed. Included abilities: Frigid Waters, Infectious Bite, Volatile Poison, Standard of Might, Molten Destruction",
          default: false,
          getFunc: () => CRUTCH.savedOptions.maelstrom.normalDamageTaken,
          setFunc: (value) => {
            CRUTCH.savedOptions.maelstrom.normalDamageTaken = value
          },
          width: "full",
        },
      ]),
    },
    {
      type: "submenu",
      name: "Vateshran Hollows",
      controls: prominentSettings(1227, [
        {
          type: "checkbox",
          name: "Show missed score adds",
          tooltip:
            "Works only in veteran, and should be used only if going for score. Skipped adds may be inaccurate if you skip entire pulls. The missed adds detection assumes that you do the secret blue side pull before the final blue side pull prior to Iozuzzunth",
          default: false,
          getFunc: () => CRUTCH.savedOptions.vateshran.showMissedAdds,
          setFunc: (value) => {
            CRUTCH.savedOptions.vateshran.showMissedAdds = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
      ]),
    },
  ]
}
