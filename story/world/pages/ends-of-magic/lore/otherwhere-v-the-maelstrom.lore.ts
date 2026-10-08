import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVTheMaelstrom = {
  id: "01a0e9ff-dc73-703d-853e-fcf0ea8af39a",
  type: "page-type/lore",
  slug: "otherwhere-v-the-maelstrom",
  title: "The Maelstrom",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-the-maelstrom",
  facts: [
    {
      fact: "The Maelstrom is a mercenary company ruled by the Maestro, a Questor of water and storm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Maestro commands the Maelstrom through captains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Maestro has sworn on Edes not to fight beyond his watery domain off Ostren.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Maestro is linked to the Aleph grid.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:50:54.579Z",
  updatedAt: "2026-09-28T21:50:58.000Z",
} as const satisfies Lore
