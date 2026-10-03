import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXAldermere = {
  id: "01a0eada-21df-7632-a24b-e646df2015f9",
  type: "page-type/place",
  slug: "otherwhere-x-aldermere",
  title: "Aldermere",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-sulon",
  facts: [
    {
      fact: "Aldermere is the biggest city of Sulon's northern heartland, five days south-east of Wexley.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The king's steward for the north sits at Aldermere, and the vale's business goes there.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
    {
      fact: "Aldermere keeps a garrison, a magistrate's hall and a guild hall of its own.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aldermere's market runs daily and is the largest a Harrow soul ever sees.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wexley folk say Aldermere has streets of stone and a wall worth the name.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-x-sulon",
      way: "out through the north gate onto the king's road",
    },
  ],
} as const satisfies Place
