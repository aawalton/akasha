import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVHenrish = {
  id: "01a0e9fb-8739-76e4-b4e2-a3e860df5b73",
  type: "page-type/lore",
  slug: "otherwhere-v-henrish",
  title: "Henrish",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-henrish",
  facts: [
    {
      fact: "Henrish is a Questor on the Ashen Accord's board, come to Davrar after the Ending of Deicide.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is built like a blacksmith, with creaking muscles and a strong grip.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He carries an enchanted hammer, anti-magic charms and a teleporting undervest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Henrish is a politician, no trained fighter, with no mage's mana pool.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Henrish rules Helmaris, a cliff city of gears and steel, whose claim a Blight hems in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He champions engineering over magic and does not welcome the gods' return.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He jokes about eating dracolizards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Henrish rules Helmaris and sits on the Accord's board.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
