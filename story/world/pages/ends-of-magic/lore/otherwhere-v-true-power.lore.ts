import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVTruePower = {
  id: "01a0e9ff-67f6-7c64-8ffe-50de28fe7f72",
  type: "page-type/lore",
  slug: "otherwhere-v-true-power",
  title: "True Power",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-true-power",
  facts: [
    {
      fact: "The mightiest beings of Davrar are called true powers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reaching level 729 in a class is called entering the territory of true power.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only true powers dare walk the underworld.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At that height levels count for little; deeds, Insight and build decide who wins.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "High-level combat is rocket tag: any undefended hit kills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Teleporting is a staple of high-level combat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "High-level fights turn on countering the enemy's build without being countered.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
