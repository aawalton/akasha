import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvRennickHale = {
  id: "01a0ed2d-ba62-7877-9958-bf46662f0017",
  type: "page-type/lore",
  slug: "overwhere-iv-rennick-hale",
  title: "Captain Rennick Hale",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Identify shows Captain Rennick Hale as Human LV 24, Guard LV 30.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hale is fair but wary of strangers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His watch is short of men, and he cannot spare guards for the roads or the Tangle.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
