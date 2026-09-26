import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { prominentSettings } from "akasha/temper/addon/pages/combat/combat-alerts-settings/modules/state/combat-alerts-settings-state.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export function arenaSettings(this: void): LamControlData[] {
  return [
    {
      type: "description",
      title: "Arenas",
      text: "Below are settings for special mechanics in specific arenas.",
      width: "full",
    },
    {
      type: "submenu",
      name: "Blackrose Prison",
      controls: prominentSettings(1082, []),
    },
    {
      type: "submenu",
      name: "Dragonstar Arena",
      controls: prominentSettings(635, [
        {
          type: "checkbox",
          name: "Alert for NORMAL damage taken",
          tooltip:
            "Displays annoying text and rings alarm bells if you start taking damage to certain abilities in NORMAL Dragonstar Arena. This is to facilitate afk farming, notifying you if manual intervention is needed. Included abilities: Nature's Blessing",
          default: false,
          getFunc: () => CRUTCH.savedOptions.dragonstar.normalDamageTaken,
          setFunc: (value) => {
            CRUTCH.savedOptions.dragonstar.normalDamageTaken = value
          },
          width: "full",
        },
      ]),
    },
    {
      type: "submenu",
      name: "Infinite Archive",
      controls: prominentSettings(1436, [
        {
          type: "checkbox",
          name: "Auto mark Fabled",
          tooltip:
            "When your reticle passes over Fabled enemies, automatically marks them with basegame target markers to make them easier to focus. It may sometimes mark incorrectly if you move too quickly and particularly if an NPC or your group member walks in front, but is otherwise mostly accurate",
          default: true,
          getFunc: () => CRUTCH.savedOptions.endlessArchive.markFabled,
          setFunc: (value) => {
            CRUTCH.savedOptions.endlessArchive.markFabled = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Auto mark Negate casters",
          tooltip:
            "The same as auto marking Fabled above, but for enemies that can cast Negate Magic (Silver Rose Stormcaster, Dro-m'Athra Conduit, Dremora Conduit). They only cast Negate when you are close enough to them",
          default: false,
          getFunc: () => CRUTCH.savedOptions.endlessArchive.markNegate,
          setFunc: (value) => {
            CRUTCH.savedOptions.endlessArchive.markNegate = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Show Brewmaster elixir spot",
          tooltip:
            "Displays an icon on where the Fabled Brewmaster may have thrown an Elixir of Diminishing. Note that it will not work on elixirs that are thrown at your group members' pets, but should for yourself, your pets, your companion, and your actual group member",
          default: true,
          getFunc: () => CRUTCH.savedOptions.endlessArchive.potionIcon,
          setFunc: (value) => {
            CRUTCH.savedOptions.endlessArchive.potionIcon = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Play sound for Uppercut / Power Bash",
          tooltip:
            'Plays a ding sound when you are targeted by an Uppercut from 2-hander enemies or Power Bash from sword-n-board enemies, e.g. Ascendant Vanguard, Dro-m\'Athra Sentinel, etc. Requires "Begin" casts on',
          default: false,
          getFunc: () => CRUTCH.savedOptions.endlessArchive.dingUppercut,
          setFunc: (value) => {
            CRUTCH.savedOptions.endlessArchive.dingUppercut = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Play sound for dangerous abilities",
          tooltip:
            "Plays a ding sound for particularly dangerous abilities. Requires \"Begin\" casts on. Currently, this only includes:\n\n- Heavy Slash from Nerien'eth\n- Obliterate from Anka-Ra Destroyers on the Warrior encounter, because if you don't block or dodge them, the CC cannot be broken free of\n- Elixir of Diminishing from Brewmasters, which also stuns you for a duration",
          default: true,
          getFunc: () => CRUTCH.savedOptions.endlessArchive.dingDangerous,
          setFunc: (value) => {
            CRUTCH.savedOptions.endlessArchive.dingDangerous = value
          },
          width: "full",
        },
        {
          type: "checkbox",
          name: "Print puzzle solution",
          tooltip:
            "In the Corridor Puzzle room, when you get close to a switch, prints to chat the solution, if known, numbered from left to right. Works only for highest difficulty",
          default: true,
          getFunc: () => CRUTCH.savedOptions.endlessArchive.printPuzzleSolution,
          setFunc: (value) => {
            CRUTCH.savedOptions.endlessArchive.printPuzzleSolution = value
            CRUTCH.OnPlayerActivated()
          },
          width: "full",
        },
      ]),
    },
  ]
}
