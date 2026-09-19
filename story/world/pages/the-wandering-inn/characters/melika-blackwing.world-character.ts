import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const melikaBlackwing = {
  id: "01a0b70b-e53e-79ad-8c0a-81ccdeab792a",
  type: "page-type/world-character",
  slug: "melika-blackwing",
  title: "Melika Blackwing",
  world: "world/the-wandering-inn",
  firstChapter: 789,
  lastChapter: 792,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
