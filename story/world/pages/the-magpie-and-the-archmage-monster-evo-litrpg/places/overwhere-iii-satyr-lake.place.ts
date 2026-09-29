import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiSatyrLake = {
  id: "01a0ed2d-97f5-76f0-8244-82fc687a67e4",
  type: "page-type/place",
  slug: "overwhere-iii-satyr-lake",
  title: "Satyr Lake",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-sunvale",
      way: "Upriver along the road to Sunvale, some five days on foot.",
    },
    {
      to: "place/overwhere-iii-cyene",
      way: "Several days along the widening river and the road to Cyene.",
    },
  ],
  facts: [
    {
      fact: "Satyr Lake is a monster zone about halfway along the river route from Sunvale to Cyene.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies many weeks of travel south of the northern hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Water nymphs haunt the lake, luring men in the shape of their ideal mates to drown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A satyr village of mud huts with cages lies in the woods near the lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Satyrs from the village abduct human women from the roads about.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fox monsters, elemental toads, thornwing owls and tree-eating beetles live about it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Big oaks, willows and blueberry shrubs grow along its shores.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A road used by adventurers passes near the lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Below the lake the river widens after meeting another; lush plains lie between.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
