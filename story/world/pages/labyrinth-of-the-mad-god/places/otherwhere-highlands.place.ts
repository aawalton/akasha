import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereHighlands = {
  id: "01a0e99b-64b1-7d6f-afdc-c68c988ec31e",
  type: "page-type/place",
  slug: "otherwhere-highlands",
  title: "The Highlands",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-cinder-isle",
  facts: [
    {
      fact: "The Highlands ring the peak above the Lowland Wood: scrub, tall grass and old lava fields.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Warm springs rise among the Highlands' rocks, some sweet, some tasting of sulphur.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lava tubes run under the old flows, caves long and dark enough to shelter in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Glassy black stone lies about the lava fields, sharp enough to cut with once chipped.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Highlands are cooler and windier than the shore, and bare of shade.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
