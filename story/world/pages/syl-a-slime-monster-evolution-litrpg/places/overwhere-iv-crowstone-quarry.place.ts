import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvCrowstoneQuarry = {
  id: "01a0ed2d-1f44-7fe5-bd65-ae02141a47b3",
  type: "page-type/place",
  slug: "overwhere-iv-crowstone-quarry",
  title: "Crowstone Quarry",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Crowstone Quarry is an abandoned stone quarry two days' walk north-west of Millbrook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Three weeks ago the quarry became a young dungeon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Monsters of LV 10 to 25 leak out of the quarry at night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The dungeon's master is LV 35.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Few in Millbrook yet know the quarry has become a dungeon.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
