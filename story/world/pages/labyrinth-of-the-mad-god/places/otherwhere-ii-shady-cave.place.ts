import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiShadyCave = {
  id: "01a0e9be-00c7-70b4-937b-e1b4be7df46b",
  type: "page-type/place",
  slug: "otherwhere-ii-shady-cave",
  title: "Shady Cave on a Hot Day",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-bladewind-badlands",
  facts: [
    {
      fact: "Shady Cave on a Hot Day is a coyote settlement of residential caves and parks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It has a stone circle for pack debate, communal halls, visitor houses and a firepit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No more than seven visitors may stay at once.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
