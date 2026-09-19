import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goblinChieftain = {
  id: "01a0b70a-a110-7065-bc45-95124e257928",
  type: "page-type/world-character",
  slug: "goblin-chieftain",
  title: "The Goblin Chieftain",
  world: "world/the-wandering-inn",
  firstChapter: 14,
  lastChapter: 17,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
