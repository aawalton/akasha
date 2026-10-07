import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const encountersCabanaBayRoom2 = {
  id: "01a1139d-4fb2-70e6-bb6f-32a06f33bd77",
  type: "page-type/place",
  slug: "encounters-cabana-bay-room-2",
  title: "Priya and Hana's room at Cabana Bay",
  world: "world/encounters",
  facts: [
    {
      fact: "Priya and Hana's room is the twin of Sofia and Kenzie's, next door, facing the same pool.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/encounters-sofia",
        "character-other/encounters-kenzie",
        "character-other/encounters-priya",
        "character-other/encounters-hana",
        "character-player/encounters-alan",
      ],
    },
    {
      fact: "The room has two queen beds; Priya's is squared away, her clothes folded by color.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/encounters-sofia",
        "character-other/encounters-kenzie",
        "character-other/encounters-priya",
        "character-other/encounters-hana",
        "character-player/encounters-alan",
      ],
    },
    {
      fact: "Hana's bed is bare but for her camera bag and a stack of exposed film canisters.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/encounters-sofia",
        "character-other/encounters-kenzie",
        "character-other/encounters-priya",
        "character-other/encounters-hana",
        "character-player/encounters-alan",
      ],
    },
    {
      fact: "A connecting door joins it to Sofia and Kenzie's room, and locks from either side.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/encounters-sofia",
        "character-other/encounters-kenzie",
        "character-other/encounters-priya",
        "character-other/encounters-hana",
      ],
    },
    {
      fact: "At night Hana drapes a scarf over the lamp, and the room glows low and amber.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/encounters-priya",
        "character-other/encounters-hana",
        "character-player/encounters-alan",
      ],
    },
  ],
} as const satisfies Place
