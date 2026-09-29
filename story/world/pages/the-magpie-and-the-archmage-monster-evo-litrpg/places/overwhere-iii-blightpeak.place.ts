import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiBlightpeak = {
  id: "01a0ed2d-97f4-780c-a607-5390ca85de4b",
  type: "page-type/place",
  slug: "overwhere-iii-blightpeak",
  title: "Blightpeak",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-sunvale",
      way: "Down off the mountain's foot and across the fields.",
      direction: "west",
    },
  ],
  facts: [
    {
      fact: "Blightpeak, once called Sunpeak, is a range of peaks just east of Sunvale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its foot is shriveled trees and dark mist, with hyena dens, spore moths and razor owls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giant toads squat in purple toxic ooze at the mountain's foot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its middle slopes hold chimera goats, panthers, fungoraks and rock wyrms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fungorak spores kill many newbie adventurers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its upper slopes are shrubs among rocks, battered by strong winds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A rotten wooden shrine with a carved rock altar sits on the summit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A chimera with lion and goat heads and a snake tail is the mountain's guardian.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its ambient mana is low, so its monsters are weak, fit for beginners.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "For forty years a purple miasma lay over the summit and crept downhill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The miasma is slowly clearing now, for the blight's source is gone.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
