import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVTheMaestro = {
  id: "01a0e9fe-3d10-7e86-bb3d-7a57d53148f0",
  type: "page-type/lore",
  slug: "otherwhere-v-the-maestro",
  title: "The Maestro",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-the-maestro",
  facts: [
    {
      fact: "The Maestro is a Questor of water and storm who rules the Maelstrom, a watery domain off Ostren.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He wears a tuxedo and carries a storm cane.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He commands captains, and his Maelstrom also hires out as a mercenary force.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He has sworn by Edes not to fight beyond the Maelstrom.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is linked to the Aleph grid of Questors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season he keeps to his watery pit in the Maelstrom, far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
