import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvMillbrookShrine = {
  id: "01a0f472-cbcc-70c4-83d2-c3c037f6f966",
  type: "page-type/place",
  slug: "overwhere-iv-millbrook-shrine",
  title: "Millbrook Shrine",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  within: "place/overwhere-iv-millbrook",
  facts: [
    {
      fact: "The shrine is one whitewashed room off the square, cool and dim, with benches and an altar.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "Seven books sit chained on a shelf behind the altar; Sister Anwen keeps the key.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "The books: two of scripture, a herbal, a vale chronicle, a primer, a road book and hero tales.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "Anwen lets a sober reader sit with a book by daylight, for a copper in the poor box.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anwen teaches the town's children their letters from the primer, mornings after bread.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The vale chronicle says Crowstone Quarry was worked out and shut some thirty years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The road book maps the vale, the east road to Aubrin, and the barony's villages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The herbal names moonleaf, frostcap and a hundred other plants of the vale, with drawings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sister Anwen lets a sober reader sit with one of the shrine's books by daylight.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "character-other/overwhere-iv-ilsa-crane",
      ],
    },
    {
      fact: "Sister Anwen is sixty, stout and grey, slow of speech and kind, with sharp eyes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Afternoons Anwen sits in the shrine mending, and unlocks a book for whoever asks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The scripture tells of gods who watch deeds and bless great ones; it names no god of space.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One hero tale tells of the Wayfarer, who stepped between cities in a breath.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tale's Wayfarer cut a castle gate with a black blade no one else could see.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hero tales call the Wayfarer long dead, and give no place, date or true name.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sister Anwen asks a copper in the poor box for a sitting with the shrine's books.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "Sister Anwen is an old woman, stout and grey, with sharp eyes, who mends in the shrine.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
  ],
} as const satisfies Place
