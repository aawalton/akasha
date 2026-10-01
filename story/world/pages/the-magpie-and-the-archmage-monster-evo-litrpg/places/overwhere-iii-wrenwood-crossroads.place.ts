import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiWrenwoodCrossroads = {
  id: "01a0ed10-f1ad-72f0-9304-b5e0b1b91437",
  type: "page-type/place",
  slug: "overwhere-iii-wrenwood-crossroads",
  title: "Wrenwood Crossroads",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-merrowgate",
      way: "Up the north road two miles between winter fields to Merrowgate's south gate.",
      direction: "north",
    },
    {
      to: "place/overwhere-iii-applegarth",
      way: "Along the east road six miles, past hedges and orchards, to Applegarth.",
      direction: "east",
    },
    {
      to: "place/overwhere-iii-wrenwood",
      way: "Down the south road under the beeches, or straight in among the trees behind the shrine.",
      direction: "south",
    },
  ],
  facts: [
    {
      fact: "Wrenwood Crossroads is where two packed-earth roads meet at the edge of an old beech wood.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A small roofed shrine of gray stone sits at the corner, with a worn carved figure inside.",
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
    {
      fact: "The east road runs six miles to Applegarth and on, three days in all, to the city of Thornmere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The south road runs under the Wrenwood's edge to the hill farms and the charcoal-burners.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shrine's figure is a cloaked woman with a staff, her face worn smooth by weather.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On the shrine's ledge lie a withered apple and two copper coins gone green with age.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Carters touch the shrine roof for luck as they pass; almost none know whose shrine it is.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is late winter; the beeches' gold is last year's dry leaves, kept on the boughs till spring.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The crossroads is thick with mana: faint currents run along both roads and meet at the shrine.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "The beeches' gold is dry dead leaves, and the air at the crossroads is winter-cold.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "The crossroads shrine has a slate roof.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-tobin-wick",
      ],
    },
    {
      fact: "Two mana currents run along the roads and meet at the shrine.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "The currents hold threads of every color; a few white-gold ones run where they cross at the shrine.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "White-gold threads reach no more than a hundred paces from the shrine along either road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The crossroads shrine's stone is warm to sit against, even in the winter cold.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Resting within a hundred paces of the shrine, a holy mage's mana comes back twice as fast.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Resting against the shrine, white-gold threads drift to a holy mage and seep in, warm as sun.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
