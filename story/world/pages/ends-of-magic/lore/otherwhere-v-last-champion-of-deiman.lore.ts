import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLastChampionOfDeiman = {
  id: "01a0e9ff-5952-7ba0-8ee1-2a16e4f32947",
  type: "page-type/lore",
  slug: "otherwhere-v-last-champion-of-deiman",
  title: "Last Champion of Deiman",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-last-champion-of-deiman",
  facts: [
    {
      fact: "The Last Champion of Deiman is a Questor woman in armor of melted gold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is the last champion of the old faith of Deiman, dead god of righteous battle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season she keeps Deiman's faith among the Questors, far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
