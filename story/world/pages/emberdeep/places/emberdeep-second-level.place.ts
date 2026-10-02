import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const emberdeepSecondLevel = {
  id: "01a0fe85-d751-7838-b3a5-452d1601bfa6",
  type: "page-type/place",
  slug: "emberdeep-second-level",
  title: "The Second Level",
  world: "world/emberdeep",
  within: "place/emberdeep-deep",
  facts: [
    {
      fact: "The second level, below the Dry Stair, is damp: water seeps down its walls and pools on the floors.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "The Drowned Hall, the second level's widest chamber, lies under knee-deep cold clear water.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "Ember-stones on the second level run the size of a walnut, and the market pays four pennies apiece.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "Gloomcaps, pale mushrooms that glow faintly, grow on the second level's wet walls.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-other/emberdeep-elowen",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "Apothecaries on Coppergate buy fresh gloomcaps at a penny for six; they make a sleeping draught.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-other/emberdeep-elowen",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "Blind white lizards as long as an arm hunt the second level's water, and their bite festers.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "The guild's map of the second level costs three pennies.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
  ],
} as const satisfies Place
