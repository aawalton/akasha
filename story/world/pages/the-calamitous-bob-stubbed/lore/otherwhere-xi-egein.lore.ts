import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEgein = {
  id: "01a0ea7f-1ca5-779a-97bf-b97a573aecae",
  type: "page-type/lore",
  slug: "otherwhere-xi-egein",
  title: "Egein Farris Ap Veor",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-egein",
  facts: [
    {
      fact: "Egein Farris Ap Veor was an outlander whose soul came to Nyil reborn in a beastling's body.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In his first world Egein was a lieutenant in the High Cities war of pressure guns and balloons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Egein's native tongue sounded to Viv like old German.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Egein led the beastling horde against the Glastian wall, moving it with real strategy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Egein sensed at once that Viv's soul was foreign, as his was.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv found Egein dying in the beastling ziggurat and beheaded him; Egein is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
