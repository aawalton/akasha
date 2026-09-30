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
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Seven books sit chained on a shelf behind the altar; Sister Anwen keeps the key.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The books: two of scripture, a herbal, a vale chronicle, a primer, a road book and hero tales.",
      knowers: ["lore-disclosure/game-master"],
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
  ],
} as const satisfies Place
