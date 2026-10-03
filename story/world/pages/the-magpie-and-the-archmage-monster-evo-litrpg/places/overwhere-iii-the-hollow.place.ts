import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiTheHollow = {
  id: "01a0ed23-174e-70ba-8103-a00edf013424",
  type: "page-type/place",
  slug: "overwhere-iii-the-hollow",
  title: "The Hollow",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-wrenwood",
      way: "North through the deep wood a day, over the Wren Brook, to the wood's edge.",
      direction: "north",
    },
  ],
  facts: [
    {
      fact: "The Hollow is a dungeon mouth under the roots of the Mother Beech, the Wrenwood's oldest tree.",
      knowers: ["lore-disclosure/game-master", "character-other/overwhere-iii-marda-hesk"],
    },
    {
      fact: "A stone door carved with an old Guild seal closes it; the Guild sealed it a century ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merrowgate folk say the Hollow ran dry of monsters and was shut; few have seen it since.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
