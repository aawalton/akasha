import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerHalfBurnedJournal = {
  id: "01a0d445-e750-7de9-80a4-433d7c712afc",
  type: "page-type/lore",
  slug: "the-tower-half-burned-journal",
  title: "The Half-Burned Journal",
  world: "world/personas",
  about: "item/the-tower-half-burned-journal",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    'The half-burned journal\'s last legible line begins "IT WEARS THE ROOM."',
    'The journal says "WHEN YOU KILL THE HOST THE WHOLE PLACE DIES AT ONCE".',
    'The journal says "AND THE FLOOR GOES WITH IT."',
    'The journal ends "BE NEAR THE STAIR WHEN IT DOES."',
  ],
} as const satisfies Lore
