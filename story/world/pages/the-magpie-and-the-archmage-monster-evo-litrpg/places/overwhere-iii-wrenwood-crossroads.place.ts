import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiWrenwoodCrossroads = {
  id: "01a0ed10-f1ad-72f0-9304-b5e0b1b91437",
  type: "page-type/place",
  slug: "overwhere-iii-wrenwood-crossroads",
  title: "Wrenwood Crossroads",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  facts: [
    {
      fact: "Wrenwood Crossroads is where two packed-earth roads meet at the edge of an old beech wood.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A small roofed shrine of grey stone sits at the corner, with a worn carved figure inside.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A wooden signpost points north to a town whose walls show above the fields.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Magpies nest in the beeches at the wood's edge and chatter at anyone passing.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "The crossroads lies in a quiet region far from where the canon's people are.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Corrupted beasts sometimes come out of the deep wood, and the town posts a bounty on them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The beeches at the crossroads are turning gold.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
  ],
} as const satisfies Place
