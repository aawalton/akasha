import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theFalseHaven = {
  id: "01a0d427-4d52-7c8c-a92c-ce7b0d111fdb",
  type: "page-type/lore",
  slug: "the-false-haven",
  title: "The False Haven",
  world: "world/personas",
  about: "place/the-tower-floor-05",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The False Haven re-weaves to pristine whenever Alan leaves it.",
    "A true form killed in the False Haven stays dead.",
    "A wounded enemy in the False Haven is whole again when Alan returns.",
  ],
} as const satisfies Lore
