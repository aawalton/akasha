import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDeeds = {
  id: "01a0ea00-21ad-7d9b-9b6a-f61565b4cf32",
  type: "page-type/lore",
  slug: "otherwhere-v-deeds",
  title: "Deeds",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-deeds",
  facts: [
    {
      fact: "Davrar lets a person choose a class to suit their deeds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Class options at level 729 depend on the great deeds a person has done.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Great deeds include clearing a corrupted Seal, clearing a Grand Dungeon and killing a Questor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When a great Deed is complete, Davrar sends a box, as if it agreed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A great deed pays a great reward: bonus Developments and higher class quality.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The fewer who share a deed, the greater each one's reward.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Folk speak of a person's tally of deeds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
