import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerHallOfWelcomeFigures = {
  id: "01a0d445-a359-796d-94a9-50cf6e24d8f2",
  type: "page-type/lore",
  slug: "the-tower-hall-of-welcome-figures",
  title: "The Hall of Welcome's Shadows",
  world: "world/personas",
  about: "place/the-tower-hall-of-welcome",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Hall of Welcome's figures fake shadows.",
    "Real fire held to a figure in the Hall of Welcome shows it throws no heat.",
  ],
} as const satisfies Lore
