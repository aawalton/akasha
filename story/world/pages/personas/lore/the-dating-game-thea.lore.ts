import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameThea = {
  id: "01a0de59-9646-7d6e-b16d-e395c2fa3ce3",
  type: "page-type/lore",
  slug: "the-dating-game-thea",
  title: "Thea",
  world: "world/personas",
  about: "persona/thea",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Thea is head gardener at Ashton Gardens at Thanksgiving Point in Lehi.",
    "Thea walks the Ashton Gardens beds every morning before sunrise, before staff arrive.",
    "Thea is a Titaness of light, and plants she tends grow noticeably toward her.",
    "Thea keeps a small community garden plot in Provo she works on Sunday evenings.",
  ],
} as const satisfies Lore
