import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiCrookAndCandle = {
  id: "01a0f173-55c7-70aa-84f6-b58086be530f",
  type: "page-type/place",
  slug: "overwhere-iii-crook-and-candle",
  title: "The Crook and Candle",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  within: "place/overwhere-iii-merrowgate",
  exits: [
    {
      to: "place/overwhere-iii-merrowgate",
      way: "Out the front door onto the Wool Square, under the bell tower.",
    },
  ],
  facts: [
    {
      fact: "The Crook and Candle is a long timbered inn on the Wool Square, with a lit front window.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its common room has a big hearth, six trestle tables, and a stair to eight rooms above.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-tobin-wick",
      ],
    },
    {
      fact: "A bed is 8 copper a night, a hot supper 3, a cup of cider 1, and a hot tub in the scullery 2.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The rooms are small and cold: a straw tick, a wool blanket, a shutter and a peg for clothes.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Bet Harrow keeps the inn; her husband Dunstan cooks, and their boy Wat minds the stable.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tonight's supper is mutton stew, black bread and hill cheese.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-tobin-wick",
        "character-other/overwhere-iii-bet-harrow",
      ],
    },
    {
      fact: "Carters, drovers and the town's few adventurers drink there of an evening.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Talk in the common room tonight is of the boy lost in the Wrenwood and the blight bounty.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-tobin-wick",
      ],
    },
    {
      fact: "Tonight's supper at the Crook and Candle is mutton and onion pie with new bread.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/overwhere-iii-bet-harrow",
        "character-other/overwhere-iii-dunstan-harrow",
        "character-player/overwhere-iii-nala",
      ],
    },
    {
      fact: "Bet gives Nala the same room under the eaves; the night passes quiet but for the wind.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/overwhere-iii-bet-harrow",
        "character-player/overwhere-iii-nala",
      ],
    },
    {
      fact: "Frost comes hard tonight, and by morning it lies thick and white on every roof in town.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Breakfast at the Crook and Candle is oat porridge with honey and small beer, 1 copper.",
      knowers: ["lore-disclosure/game-master", "character-other/overwhere-iii-bet-harrow"],
    },
    {
      fact: "Supper on Nala's third night is barley soup with pork sausages and black bread, 3 copper.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-bet-harrow",
      ],
    },
    {
      fact: "Tonight the common room talks of the red-haired healer; some raise a cup to her as she comes in.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-bet-harrow",
      ],
    },
    {
      fact: "The fourth night's supper at the Crook and Candle is ham-hock and barley stew with brown bread.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-bet-harrow",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
