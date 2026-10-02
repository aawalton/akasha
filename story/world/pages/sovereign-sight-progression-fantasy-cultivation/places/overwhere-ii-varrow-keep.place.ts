import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiVarrowKeep = {
  id: "01a0ed20-ba0b-75a5-a35c-11a2e8ad6314",
  type: "page-type/place",
  slug: "overwhere-ii-varrow-keep",
  title: "Varrow Keep",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  within: "place/overwhere-ii-wendlemere",
  facts: [
    {
      fact: "Varrow Keep is an old grey tower-house on a crag at the valley's east end, a day from the Ford.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "Thirty men-at-arms and a dozen servants live in the Keep, and its roofs leak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Four Talented serve Lady Varrow, none past First Depth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Keep's gate is barred at dusk, and the Lady receives no one after dark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The road from the Ford to the Keep runs east up the valley, past scattered farms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A guest who reaches the Keep after noon is fed and lodged, and the Lady receives them next morning.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
