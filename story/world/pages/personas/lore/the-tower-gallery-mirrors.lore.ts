import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerGalleryMirrors = {
  id: "01a0d445-c274-7cea-84dd-26628776e0a2",
  type: "page-type/lore",
  slug: "the-tower-gallery-mirrors",
  title: "The Gallery Mirrors",
  world: "world/personas",
  about: "item/the-tower-gallery-mirrors",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["Real presences reflect in the Long Gallery's mirrors; woven figures do not."],
} as const satisfies Lore
