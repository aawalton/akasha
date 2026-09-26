import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const towerOfNimueMarcus = {
  id: "01a0dec2-4dfc-7acb-b2ff-2808925c418b",
  type: "page-type/world-character",
  slug: "tower-of-nimue-marcus",
  title: "Marcus",
  world: "world/tower-of-nimue",
} as const satisfies WorldCharacter
