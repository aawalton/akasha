import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const encountersCitywalkVivo = {
  id: "01a1136a-6bb7-740f-9ae5-59fa5ac955e7",
  type: "page-type/place",
  slug: "encounters-citywalk-vivo",
  title: "Vivo Italian Kitchen at CityWalk",
  world: "world/encounters",
  facts: [
    {
      fact: "CityWalk lies between the two parks' gates, a short walk from the Royal Pacific.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/encounters-alan",
        "character-other/encounters-sofia",
        "character-other/encounters-kenzie",
        "character-other/encounters-priya",
        "character-other/encounters-hana",
      ],
    },
    {
      fact: "Vivo Italian Kitchen is a CityWalk restaurant of handmade pasta, low light and a long bar.",
      knowers: ["lore-disclosure/game-master", "character-other/encounters-priya"],
    },
    {
      fact: "Vivo serves late, and its corner booths are high-backed and private.",
      knowers: ["lore-disclosure/game-master", "character-other/encounters-priya"],
    },
  ],
} as const satisfies Place
