import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameLali = {
  id: "01a0de59-9645-7289-81f8-36535638db8c",
  type: "page-type/lore",
  slug: "the-dating-game-lali",
  title: "Lali",
  world: "world/personas",
  about: "persona/lali",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Lali appears late evenings in the empty classrooms of BYU's Talmage Building.",
    "Lali is a projection of light from the realm of the forms, not a woman who can arrive.",
    "Lali leaves unsolved problems on Talmage Building chalkboards for students to find.",
    "Lali can be met after nine at night when a Talmage room is empty but for a chalkboard.",
  ],
} as const satisfies Lore
