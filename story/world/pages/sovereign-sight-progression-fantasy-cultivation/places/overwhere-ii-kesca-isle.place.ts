import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiKescaIsle = {
  id: "01a0ed26-0970-78ba-a698-c99426381d30",
  type: "page-type/place",
  slug: "overwhere-ii-kesca-isle",
  title: "Kesca Isle",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Kesca Isle is an island of the Phaar Region, south of Liir across deadly water.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kesca Isle's great city is Vodaten.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
