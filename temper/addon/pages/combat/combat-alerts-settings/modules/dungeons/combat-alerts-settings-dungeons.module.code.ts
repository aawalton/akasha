import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function dungeonSettings(this: void): LamControlData[] {
  return [
    {
      type: "description",
      title: "Dungeons",
      text: "Below are settings for special mechanics in specific dungeons.",
      width: "full",
    },
    {
      type: "submenu",
      name: "Black Gem Foundry",
      controls: [
        {
          type: "checkbox",
          name: "Show Rupture preview line",
          tooltip:
            "Shows a line during the ping pong phase on Quarrymaster Saldezaar, to help preview where you would get ponged to",
          default: true,
          getFunc: () => CRUTCH.savedOptions.blackGemFoundry.showRuptureLine,
          setFunc: (value) => {
            CRUTCH.savedOptions.blackGemFoundry.showRuptureLine = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
      ],
    },
    {
      type: "submenu",
      name: "Shipwright's Regret",
      controls: [
        {
          type: "checkbox",
          name: "Suggest stacks for Soul Bomb",
          tooltip:
            "Displays a notification for suggested person to stack on for Soul Bomb on Foreman Bradiggan hardmode when there are 2 bombs. Also shows an icon above that person's head. The suggested stack is alphabetical based on @ name",
          default: true,
          getFunc: () => CRUTCH.savedOptions.shipwrightsRegret.showBombStacks,
          setFunc: (value) => {
            CRUTCH.savedOptions.shipwrightsRegret.showBombStacks = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
      ],
    },
  ]
}
