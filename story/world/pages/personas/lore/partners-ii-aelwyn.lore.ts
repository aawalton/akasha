import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAelwyn = {
  id: "01a0de51-2d5e-7c41-820e-cc61260536f2",
  type: "page-type/lore",
  slug: "partners-ii-aelwyn",
  title: "Aelwyn",
  world: "world/personas",
  about: "character-other/partners-ii-aelwyn",
  facts: [
    {
      fact: "Aelwyn is warden of the Greenreach's north fold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aelwyn has tended Hearthholt's walled garden in secret for years, unthanked.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aelwyn comes into the garden over the low tumbled corner of its wall, in grey light.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aelwyn has never come into the garden by its door.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Aelwyn's Talent is Wildmarriage.", knowers: ["lore-disclosure/game-master"] },
  ],
} as const satisfies Lore
