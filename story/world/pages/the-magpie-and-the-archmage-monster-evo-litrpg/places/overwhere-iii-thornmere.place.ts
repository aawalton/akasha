import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiThornmere = {
  id: "01a0ed32-5182-71ce-9f8b-7bcf18aa961e",
  type: "page-type/place",
  slug: "overwhere-iii-thornmere",
  title: "Thornmere",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-applegarth",
      way: "West two days on the hill road through villages to Applegarth, and on to the crossroads.",
      direction: "west",
    },
    {
      way: "South by the rail line from Thornmere station, days to the Dominion's great cities.",
      direction: "south",
    },
  ],
  facts: [
    {
      fact: "Thornmere is the Wrenmark's city, some fifteen thousand people on a lake, three days east.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is the northern end of a rail line running south to the Dominion's great cities.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its Adventurers Guild hall has a class advancement stone and ranks up to Gold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An Elite magistrate of the Order of Iron Law governs it from the lake-hall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It has a small mage school, the Lakeside Academy, that takes paying students each autumn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its markets buy glimmerstones at 30 copper and sell skill scrolls, wands and good potions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its gates check papers; a stranger without them is taken to the magistrate's clerk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
