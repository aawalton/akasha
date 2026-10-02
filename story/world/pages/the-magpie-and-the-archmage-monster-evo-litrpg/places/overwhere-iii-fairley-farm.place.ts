import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiFairleyFarm = {
  id: "01a0fdd3-6c3e-7ff1-9c20-31a1123b6a25",
  type: "page-type/place",
  slug: "overwhere-iii-fairley-farm",
  title: "Fairley Farm",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-merrowgate",
      way: "West along the Thornmere road three miles, between hedges, to Merrowgate's east gate.",
    },
    {
      way: "Behind the hen-house, across the barley stubble to a hazel copse on a hedgebank.",
    },
  ],
  facts: [
    {
      fact: "Fairley Farm lies three miles east of Merrowgate on the Thornmere road, an hour's walk.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/overwhere-iii-oswin-fairley",
        "character-player/overwhere-iii-nala",
      ],
    },
    {
      fact: "It is a low stone farmhouse, a cow byre, a wattle hen-house, and barley fields gone to stubble.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/overwhere-iii-oswin-fairley",
        "character-player/overwhere-iii-nala",
      ],
    },
    {
      fact: "The hen-house's wattle is torn open at one corner, the ground thick with feathers and blood.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/overwhere-iii-oswin-fairley",
        "character-player/overwhere-iii-nala",
      ],
    },
    {
      fact: "Behind the stubble a hazel copse grows on an old hedgebank, riddled with a disused badger sett.",
      knowers: ["lore-disclosure/game-master", "character-other/overwhere-iii-oswin-fairley"],
    },
    {
      fact: "The blighted fox lairs in the badger sett in the hazel copse; the ground at its mouth is gray.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
