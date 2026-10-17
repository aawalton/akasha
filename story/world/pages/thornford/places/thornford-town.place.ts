import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const thornfordTown = {
  id: "01a14b65-1e22-7ee7-a455-3f5cd6ec60a8",
  type: "page-type/place",
  slug: "thornford-town",
  title: "Thornford",
  world: "world/thornford",
  facts: [
    {
      fact: "Thornford is a market town in a Highland valley, on the river Elt.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
    {
      fact: "The town's dressmakers' guild is jealous of its trade.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Blackthorn grows thick along the riverbank by the ford, and is in flower before Beltane.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Bone needles for leather and sacking are sold at the market stalls.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "The rain holds over the valley all night and all the next day, two days before Beltane.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The sun first shows over the valley on the morning before Beltane, and Beltane day is clear.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The rain stopped in the night, and the sun showed at dawn on April 30 after two days of rain.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
  ],
  createdAt: "2026-10-17T19:44:40.481Z",
  updatedAt: "2026-10-17T21:59:36.058Z",
} as const satisfies Place
