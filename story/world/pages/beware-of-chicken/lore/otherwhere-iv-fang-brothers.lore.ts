import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvFangBrothers = {
  id: "01a0eaab-f291-7638-a899-3e9707adefa9",
  type: "page-type/lore",
  slug: "otherwhere-iv-fang-brothers",
  title: "The Fang Brothers",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "The two loud Fang brothers are named Fang Da and Fang Er.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-iv-nala",
        "character-other/otherwhere-iv-zhao-jun",
      ],
    },
    {
      fact: "Nala called the Fang brothers strong lads and sent them to Headman Gu about the hunt.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-iv-nala",
        "character-other/otherwhere-iv-zhao-jun",
      ],
    },
    {
      fact: "The Fang brothers are telling the lane that Nala is a fox.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-iv-nala",
        "character-other/otherwhere-iv-tie-bo",
        "character-other/otherwhere-iv-granny-hua",
      ],
    },
  ],
} as const satisfies Lore
