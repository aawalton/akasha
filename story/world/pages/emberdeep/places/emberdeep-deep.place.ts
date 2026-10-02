import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const emberdeepDeep = {
  id: "01a0fdf5-b2d6-7ced-b3a6-55c78c922084",
  type: "page-type/place",
  slug: "emberdeep-deep",
  title: "The Deep",
  world: "world/emberdeep",
  within: "place/emberdeep-town",
  facts: [
    {
      fact: "Past the Mouth a broad worn ramp runs down into the dark to the guild's gate.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "A guild warden at the gate signs every party in and out in the Mouth book.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "A party not signed out of the Mouth book by the next morning is searched for.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "The Deep has no light of its own; delvers carry lamps, and the air is cold and still.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
  ],
} as const satisfies Place
