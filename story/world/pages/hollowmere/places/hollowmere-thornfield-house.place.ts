import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hollowmereThornfieldHouse = {
  id: "01a0fd18-7893-7625-a3e7-5f4d37052db4",
  type: "page-type/place",
  slug: "hollowmere-thornfield-house",
  title: "Thornfield House",
  world: "world/hollowmere",
  within: "place/hollowmere-academy",
  facts: [
    {
      fact: "Thornfield is the oldest of Hollowmere's five houses, three storeys of grey stone by the shore.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-yusra",
      ],
    },
    {
      fact: "Thornfield's top floor has sixteen single rooms on one corridor, a kitchen and two bathrooms.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-yusra",
      ],
    },
    {
      fact: "Room 14 on Thornfield's top floor is narrow: a bed, a desk, a wardrobe and a window on the mere.",
      knowers: ["lore-disclosure/game-master", "character-other/hollowmere-yusra"],
    },
    {
      fact: "Room 15 is across the corridor from room 14, and room 1 is at the head of the stairs.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-yusra",
      ],
    },
    {
      fact: "Thornfield's radiators knock all night, and the hot water runs out by eight in the morning.",
      knowers: ["lore-disclosure/game-master", "character-other/hollowmere-yusra"],
    },
  ],
} as const satisfies Place
