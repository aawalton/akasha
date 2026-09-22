import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const laisaHighMage = {
  id: "01a0b70b-777a-7812-8866-37b3fe54a141",
  type: "page-type/world-character",
  slug: "laisa-high-mage",
  title: "Laisa",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 477,
  lastChapter: 477,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
