import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerDrownedSentry01 = {
  id: "01a0d44e-2c3f-7d27-a94e-74ab6a224b16",
  type: "page-type/lore",
  slug: "the-tower-drowned-sentry-01",
  title: "The Drowned Sentry",
  world: "world/personas",
  about: "character-other/the-tower-drowned-sentry-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Drowned Sentry is dead, burned out through its neck-seam.",
    "The Drowned Sentry's shell is waterlogged plate rusted fused at every joint over dry rot.",
  ],
} as const satisfies Lore
