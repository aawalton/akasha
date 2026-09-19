import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const highMageLaisa = {
  id: "01a0b70a-fc3f-7456-b697-21e7e66d51d6",
  type: "page-type/world-character",
  slug: "high-mage-laisa",
  title: "Laisa",
  world: "world/the-wandering-inn",
  firstChapter: 437,
  lastChapter: 437,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
