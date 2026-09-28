import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereChildrensHaven = {
  id: "01a0e9be-c9bc-70fa-acc7-aae00ea824e2",
  type: "page-type/place",
  slug: "otherwhere-childrens-haven",
  title: "The Children's Haven",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-earth",
  facts: [
    {
      fact: "A real old-Earth hotel of concrete and glass hides in a savanna beside the badlands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A barrier blocks all sight of it from outside.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
