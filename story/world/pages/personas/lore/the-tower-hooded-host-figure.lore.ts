import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerHoodedHostFigure = {
  id: "01a0d445-9a28-7d6a-8063-3a0b73fc9c88",
  type: "page-type/lore",
  slug: "the-tower-hooded-host-figure",
  title: "The Hooded Figure at the Threshold",
  world: "world/personas",
  about: "item/the-tower-hooded-host-figure",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["The hooded figure at the Threshold is a projection of the Host."],
} as const satisfies Lore
