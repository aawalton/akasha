import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvNorthWestPastures = {
  id: "01a0fdb4-0852-7399-ba8b-a42398e46e31",
  type: "page-type/place",
  slug: "overwhere-iv-north-west-pastures",
  title: "The North-West Pastures",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The north-west pastures are open sheep downs, starting two miles out of Millbrook's north gate.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "Ilsa or any shepherd will point the way: out the north gate, left at the shrine's stone cross.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "character-other/overwhere-iv-ilsa-crane",
      ],
    },
    {
      fact: "At the pastures' far edge the disused cart track to Crowstone runs on north-west over moor.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "The quarry is two days up that track; no one walks there and back in a day.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "character-other/overwhere-iv-ilsa-crane",
      ],
    },
    {
      fact: "Old Dunny Carrow's son Fen grazes a flock up here, and sleeps in a stone hut by the fold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fen saw the great wolf; he lost two ewes in three nights, dragged off whole up the track.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the mud by Fen's fold are paw prints as wide as a man's spread hand.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "Drag marks and prints run up the cart track, plain to anyone looking.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "The track's ruts are grassed over but firm; the moor beside it is tussock and bog holes.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "Five miles up the track a gorse-choked gully, Crake Gill, cuts across it, with a beck below.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Young Fen Carrow keeps sheep at a fold beside a stone hut; he lost two ewes in three nights.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "Fen told Nala his lost ewes were dragged off whole, up the track.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "Between the north gate and the pastures, the downs are empty, grazed short and dotted with boulders.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
