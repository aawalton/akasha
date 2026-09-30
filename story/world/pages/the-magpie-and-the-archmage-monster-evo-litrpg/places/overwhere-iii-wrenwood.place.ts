import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiWrenwood = {
  id: "01a0ed23-174f-7a4a-b827-767731c41980",
  type: "page-type/place",
  slug: "overwhere-iii-wrenwood",
  title: "The Wrenwood",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-wrenwood-crossroads",
      way: "North out from under the beeches to the crossroads shrine at the wood's edge.",
      direction: "north",
    },
    {
      to: "place/overwhere-iii-greywater-tarn",
      way: "West along the Wren Brook half a day, out of the beeches to the tarn among the reeds.",
      direction: "west",
    },
    {
      to: "place/overwhere-iii-the-hollow",
      way: "South past the Wren Brook, a day into the deep wood, to the roots of the Mother Beech.",
      direction: "south",
    },
  ],
  facts: [
    {
      fact: "The Wrenwood is an old beech forest running some twenty miles south and west of the crossroads.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its edge is thin and quiet: magpies, deer, boar, jackalopes and woodcutters' paths.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Wren Brook runs east to west an hour in; past it the deep wood begins.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the deep wood the ambient mana thickens, and the monsters there grow stronger.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its monsters are jackalopes, tree devourer beetles, thornwing owls, wolves and giantmaw hyenas.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wrenwood monsters mostly run from Level 1 at the edge to Level 20 in the deep wood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Corrupted beasts come out of the deep wood: black smoke at the mouth, hollow eyes, rotting hide.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This winter three corrupted beasts reached the fields, where a year used to see one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A treant the townsfolk call Old Greyhand lives in the deep wood, and they leave it be.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Charcoal-burners work clearings along the south road; one hut by the Wren Brook still smokes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cal Fenn, a young hunter, went into the deep wood at midwinter and has not come back.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Frostcaps grow only in frost, on the north side of old beech roots along the wood's edge.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A careful picker finds twenty frostcaps in two or three hours on the paths near the crossroads.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Gravecap looks like frostcap but is grayer and smells of wet ash; eaten, it sickens for days.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A frostcap pulled by the stem bruises gray and is worthless; it must be cut at the root.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Brannagh Tull buys frostcaps for her fever tea and chilblain salve, a copper apiece.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
