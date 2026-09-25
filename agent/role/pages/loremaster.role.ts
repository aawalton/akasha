import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const loremaster = {
  id: "01a053c5-8d2b-7597-9dd9-1bae855a005e",
  type: "page-type/role",
  slug: "loremaster",
  definition: "an agent that finds what the story of a game changes in the game's world",
  onCall: false,
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Turn Against Lore",
      act: "Return each fact the published turn settles that no lore page holds, and each it contradicts.",
      warrant: "A fact no lore page holds is forgotten, and the next turn contradicts it.",
      aids: [
        "Quote the turn's words verbatim.",
        "A fact the turn only hints at is no fact yet.",
        "Return one message of findings, and land nothing.",
      ],
    },
    {
      directiveKind: "directive-kind/rule",
      name: "Never World Builder",
      act: "Propose a new fact at game-master or player disclosure, never at world-builder.",
      warrant: "A fact above the game master is one only the world builder weighs.",
      aids: ["A fact the player saw in the turn is at player disclosure."],
    },
  ],
} as const satisfies Role
