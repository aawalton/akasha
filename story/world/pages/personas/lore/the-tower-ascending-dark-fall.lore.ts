import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerAscendingDarkFall = {
  id: "01a0d444-9e6a-7b60-85c7-76f7ac7a0567",
  type: "page-type/lore",
  slug: "the-tower-ascending-dark-fall",
  title: "The Fall in the Ascending Dark",
  world: "world/personas",
  about: "place/the-tower-floor-04",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["A fall down the Ascending Dark's shaft is always fatal."],
} as const satisfies Lore
