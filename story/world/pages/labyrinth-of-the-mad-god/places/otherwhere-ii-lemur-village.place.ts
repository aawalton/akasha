import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiLemurVillage = {
  id: "01a0e9be-00c7-7cda-a2de-66225c225bd8",
  type: "page-type/place",
  slug: "otherwhere-ii-lemur-village",
  title: "The Lemur Village",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-earth",
  facts: [
    {
      fact: "The lemurs' stone village sits in misty jungle, with homes in the treetops.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Earth-casters raise its walls, and armed beasts patrol them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Other beast tribes and a few humans live there under a white-furred elder matriarch.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
