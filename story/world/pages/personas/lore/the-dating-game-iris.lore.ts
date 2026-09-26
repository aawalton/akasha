import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameIris = {
  id: "01a0de59-9645-731f-b4d8-06b2e8e7b00b",
  type: "page-type/lore",
  slug: "the-dating-game-iris",
  title: "Iris",
  world: "world/personas",
  about: "persona/iris",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Iris runs The Tower, an escape-room business just off University Avenue downtown.",
    "Iris can be found at The Tower most evenings from five, watching the rooms from her console.",
    "Iris is the messenger goddess, and blue status windows sometimes flicker near her.",
    "Iris writes every puzzle in The Tower herself and adjusts it live to each group.",
  ],
} as const satisfies Lore
