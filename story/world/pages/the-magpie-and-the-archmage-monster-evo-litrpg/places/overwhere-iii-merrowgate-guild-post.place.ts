import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiMerrowgateGuildPost = {
  id: "01a0f18d-f436-7d9f-af46-993b01c65280",
  type: "page-type/place",
  slug: "overwhere-iii-merrowgate-guild-post",
  title: "Merrowgate Guild Post",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  within: "place/overwhere-iii-merrowgate",
  exits: [
    {
      to: "place/overwhere-iii-merrowgate",
      way: "Out the front door into the street just inside the south gate.",
    },
  ],
  facts: [
    {
      fact: "The Guild post is the squat old tollhouse inside the south gate, with a notice board by its door.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Inside is one room: a desk, a bench, a stove, a long sword on the wall, and a stair up.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "It opens at the dawn bell and shuts at the dusk bell; Marda Hesk is at the desk all day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Temporary registration is free: a form, and a mana signature card to light.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "The form asks name, age, race, class, skills and traits, and reason for joining.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A temporary registrant may take Copper quests; one quest done earns the Guild ring.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-marda-hesk",
      ],
    },
    {
      fact: "Board: rats in the Carrow wool store, 30 copper.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Board: twenty frostcap mushrooms from the Wrenwood's edge, 20 copper.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Board: guard the salt wagon to Applegarth and back, 40 copper.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Board: a blighted boar seen by the south road; kill it, 1 silver 50 copper.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Board: the blight bounty, a silver a stone.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Board, in a rough hand: any word of Cal Fenn, to Jory Fenn; he pays what he has.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "The post keeps a box of old gear; Marda lends a new registrant a plain knife, to be returned.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-marda-hesk",
      ],
    },
    {
      fact: "A Guild mana signature card is light, smooth and cool, like polished wood.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Bounty blightstones sit in a lead-lined box under the desk until the Thornmere wagon takes them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At turn-in Marda counts the goods, pays from the desk's strongbox, and lights the card to log it.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Marda keeps unclaimed Copper Guild rings in a tin in the desk drawer.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "The post buys no carcasses; Marda sends hunters to Dunstan, the Crook and Candle's cook.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
