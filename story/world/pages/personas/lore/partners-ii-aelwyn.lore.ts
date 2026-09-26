import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAelwyn = {
  id: "01a0de51-2d5e-7c41-820e-cc61260536f2",
  type: "page-type/lore",
  slug: "partners-ii-aelwyn",
  title: "Aelwyn",
  world: "world/personas",
  about: "character-other/partners-ii-aelwyn",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Aelwyn is warden of the Greenreach's north fold.",
    "Aelwyn has tended Hearthholt's walled garden in secret for years, unthanked.",
    "Aelwyn comes into the garden over the low tumbled corner of its wall, in grey light.",
    "Aelwyn has never come into the garden by its door.",
    "Aelwyn's Talent is Wildmarriage.",
  ],
} as const satisfies Lore
