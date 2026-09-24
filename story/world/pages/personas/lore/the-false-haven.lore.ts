import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theFalseHaven = {
  id: "01a0d427-4d52-7c8c-a92c-ce7b0d111fdb",
  type: "page-type/lore",
  slug: "the-false-haven",
  title: "The False Haven",
  world: "world/personas",
  about: "place/the-tower-floor-05",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["Nothing weaves the False Haven now, so it and its wounded remain as they are left."],
} as const satisfies Lore
