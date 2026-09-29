import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereISunkenShrine = {
  id: "01a0ed29-16a2-76a9-a2a0-05d6d1aa2d16",
  type: "page-type/place",
  slug: "overwhere-i-sunken-shrine",
  title: "The Sunken Shrine",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "The sunken shrine lies in the deep Greyfen, half a day west of the ford by the old causeway.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fenwatch calls it the Drowned Chapel, and few living have seen it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only its peaked stone roof and a leaning arch rise above a black pool ringed with drowned pines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is built of pale close-fitted stone found nowhere else in the march.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Over the arch a carved ring of five marks circles a closed eye.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The causeway to it is broken in places and must be waded chest-deep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bogmaws and reedlurkers haunt the pool around it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Warm air breathes up through gaps in its roof on cold mornings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its nave is half flooded, and a stair beneath the altar goes down into black water.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
