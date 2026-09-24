import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerDeepDenFigures = {
  id: "01a0d445-d38b-7b4a-b12b-de97b82be42e",
  type: "page-type/lore",
  slug: "the-tower-deep-den-figures",
  title: "The Deep Den's Figures",
  world: "world/personas",
  about: "item/the-tower-deep-den-figures",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["The Deep Den's figures fake shadow, heat and reflection at once."],
} as const satisfies Lore
