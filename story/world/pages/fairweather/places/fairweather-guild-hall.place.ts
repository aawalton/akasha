import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const fairweatherGuildHall = {
  id: "01a102af-305b-7db6-bb17-c8e7a115ede2",
  type: "page-type/place",
  slug: "fairweather-guild-hall",
  title: "The Guild Hall",
  world: "world/fairweather",
  within: "place/fairweather-lanternmere",
  facts: [
    {
      fact: "The guild hall is a great timber hall with a green copper roof on Brightwater Square.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
      ],
    },
    {
      fact: "Registering costs two lanterns, and each adventurer gets a copper rank tag stamped with her name.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "The quest board runs the length of the hall, its notices sorted by rank from F up to S.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "The party board is where parties chalk their names on slates and seek adventurers to fill them.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "The bottom corner of the party board, where cast-offs and misfits post, is called the Leftovers.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "The guildmaster is a retired A-rank swordswoman, Chinese, in her fifties, with an office upstairs.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "The guild's Wardens keep a room off the main hall, behind a charcoal-painted door.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-player/fairweather-elsie",
      ],
    },
    {
      fact: "On the F-rank board today: moonbells from the Glasswood's edge for an apothecary, six lanterns.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "On the F-rank board today: cellar rats under the Crooked Kettle tea house, four lanterns.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "On the F-rank board today: a lost goat somewhere in the Underbloom's first floor, three lanterns.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
  ],
} as const satisfies Place
