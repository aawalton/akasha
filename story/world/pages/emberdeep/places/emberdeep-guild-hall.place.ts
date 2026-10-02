import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const emberdeepGuildHall = {
  id: "01a0fdc6-e790-77be-8ff2-7957f1b0c4f4",
  type: "page-type/place",
  slug: "emberdeep-guild-hall",
  title: "The Guild Hall",
  world: "world/emberdeep",
  within: "place/emberdeep-town",
  facts: [
    {
      fact: "The Delvers' Guild hall is a long hall of dark beams and old stone on Coppergate.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-other/emberdeep-elowen",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "New delvers register at the front desk on working days, from eight in the morning until noon.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "Registering needs a letter of introduction and costs one silver mark.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-other/emberdeep-elowen",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "A registered delver is given a copper rank token, stamped with her name, on a leather cord.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "A new delver hears the Rules of the Deep read aloud by a clerk before she may go down.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "The party board chalks up every party wanting hands, and every delver looking for a party.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "The guild sells a copy of the first level's map for two pennies.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
      ],
    },
  ],
} as const satisfies Place
