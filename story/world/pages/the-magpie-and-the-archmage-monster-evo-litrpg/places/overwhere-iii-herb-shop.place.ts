import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiHerbShop = {
  id: "01a10363-b058-7833-9646-df2be1fe3cf9",
  type: "page-type/place",
  slug: "overwhere-iii-herb-shop",
  title: "Brannagh's Herb Shop",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  within: "place/overwhere-iii-merrowgate",
  exits: [
    {
      to: "place/overwhere-iii-merrowgate",
      way: "Out the low door under the crooked green sign, into the lane off the Wool Square.",
    },
  ],
  facts: [],
} as const satisfies Place
