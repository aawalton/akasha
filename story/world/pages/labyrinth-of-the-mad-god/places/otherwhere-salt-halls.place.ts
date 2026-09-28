import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereSaltHalls = {
  id: "01a0e99b-64b1-7628-8ec4-91ebc7c1be4b",
  type: "page-type/place",
  slug: "otherwhere-salt-halls",
  title: "The Salt Halls",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-gullrock-head",
  facts: [
    {
      fact: "The Salt Halls are a dungeon under Gullrock Head, apart from the isle's own ground.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
