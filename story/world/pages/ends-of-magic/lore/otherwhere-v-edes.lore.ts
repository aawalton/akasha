import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVEdes = {
  id: "01a0e9f9-d8c4-7970-8f55-8acb61c9414e",
  type: "page-type/lore",
  slug: "otherwhere-v-edes",
  title: "Edes",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-edes",
  facts: [
    {
      fact: "Edes is an old god called the Witness of Promises, whose divine mana is grey.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"By Edes" is a common oath; Questors such as Brox and Garna swear by Edes.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Edes died with the other gods in the Ending of Deicide; some call Edes a rotting corpse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Questor called the Maestro swore on Edes never to fight beyond his Maelstrom.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
