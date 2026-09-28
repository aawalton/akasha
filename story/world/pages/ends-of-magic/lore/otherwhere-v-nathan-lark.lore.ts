import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVNathanLark = {
  id: "01a0e9f5-00f9-72b4-ae7f-2dc66815e952",
  type: "page-type/lore",
  slug: "otherwhere-v-nathan-lark",
  title: "Nathan Lark",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-nathan-lark",
  facts: [
    {
      fact: "Nobody on Elothia has heard of Nathan Lark in the season Nala arrives.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nathan Lark is a tall Earth-born man, a student of biology, new to Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the arrival season, Nathan is in the pine hills near Taeol's tower, west of Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the arrival season he is fleeing Taeol with Gemore's scouts, far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
