import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVGrandDungeons = {
  id: "01a0e9fb-c0e7-79fb-8e8f-761e644edb3f",
  type: "page-type/lore",
  slug: "otherwhere-v-grand-dungeons",
  title: "Grand Dungeons",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-grand-dungeons",
  facts: [
    {
      fact: "The Ascendant Academy of Giantsrest is built inside a Grand Dungeon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "That Grand Dungeon was the last Giant's, taken when Giantsrest enslaved him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Completing a Grand Dungeon pays out at the next Development: every class skill upgrades.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clearing a Grand Dungeon implies a class of astronomical quality.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clearing a blight is likened to a Grand Dungeon: a great reward for a great deed.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
