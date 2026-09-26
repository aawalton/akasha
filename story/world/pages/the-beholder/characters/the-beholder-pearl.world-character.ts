import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theBeholderPearl = {
  id: "01a0dec2-4dfc-7a83-a6cc-7f15690be980",
  type: "page-type/world-character",
  slug: "the-beholder-pearl",
  title: "Pearl",
  world: "world/the-beholder",
} as const satisfies WorldCharacter
