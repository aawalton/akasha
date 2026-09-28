import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXanian = {
  id: "01a0e9be-00c8-75ed-bab0-7505a6f69b7b",
  type: "page-type/place",
  slug: "otherwhere-xanian",
  title: "The Lost City of Xanian",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-aurora-lake",
  facts: [
    {
      fact: "Xanian is a drowned alien city of curved, glowing blue stone at the bottom of the lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A mana dome keeps the city full of air and seals it from outside.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A massive silvery door with thousands of sliding rune tiles and twelve hollows bars the way.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
