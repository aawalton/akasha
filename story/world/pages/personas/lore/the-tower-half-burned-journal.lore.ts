import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerHalfBurnedJournal = {
  id: "01a0d445-e750-7de9-80a4-433d7c712afc",
  type: "page-type/lore",
  slug: "the-tower-half-burned-journal",
  title: "The Half-Burned Journal",
  world: "world/personas",
  about: "story-item/the-tower-half-burned-journal",
  facts: [
    {
      fact: 'The half-burned journal\'s last legible line begins "IT WEARS THE ROOM."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The journal says "WHEN YOU KILL THE HOST THE WHOLE PLACE DIES AT ONCE".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The journal says "AND THE FLOOR GOES WITH IT."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The journal ends "BE NEAR THE STAIR WHEN IT DOES."',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
