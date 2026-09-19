import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ryokaGriffin = {
  id: "01a06580-2495-75a6-80f6-47528af154ec",
  type: "page-type/world-character",
  slug: "ryoka-griffin",
  title: "Ryoka Griffin",
  world: "world/the-wandering-inn",
  maxLevel: 8,
  eventCount: 5,
  firstChapter: 21,
  lastChapter: 776,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
