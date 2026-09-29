import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvSelbyCottage = {
  id: "01a0ed2c-dfc9-7ebb-9b19-79cbb480baa1",
  type: "page-type/place",
  slug: "overwhere-iv-selby-cottage",
  title: "Selby's Cottage",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Selby's Cottage is a herb-wife's cottage at the eastern edge of the Tangle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It has a turf roof, a smoking chimney and a garden of herbs behind a wattle fence.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bundles of drying herbs hang from every beam inside.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Salves, teas and simples are sold from the cottage door, for a few copper each.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wolves and goblins leave the cottage alone, and the town wonders why.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
