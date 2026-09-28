import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVBandrin = {
  id: "01a0e9f7-b02d-75f8-84a3-848d225336bc",
  type: "page-type/lore",
  slug: "otherwhere-v-bandrin",
  title: "Bandrin Fate-weaver",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-bandrin",
  facts: [
    {
      fact: "Bandrin is a Questor fate-weaver who dresses like a witch in pastels.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bandrin speaks rhymes that become prophecies and slow enemy magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A counter-rhyme in the same meter breaks Bandrin's weaving.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Bandrin is one Questor among many, far from Giantsrest's continent.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
