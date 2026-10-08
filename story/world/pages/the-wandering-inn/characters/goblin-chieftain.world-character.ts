import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goblinChieftain = {
  id: "01a0b70a-a110-7065-bc45-95124e257928",
  type: "page-type/world-character",
  slug: "goblin-chieftain",
  title: "The Goblin Chieftain",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 14,
  lastChapter: 17,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:02.256Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
