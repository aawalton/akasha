import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const revi = {
  id: "01a06580-2495-79e8-b64e-0409f29d5174",
  type: "page-type/world-character",
  slug: "revi",
  title: "Revi",
  world: "world/the-wandering-inn",
  maxLevel: 33,
  eventCount: 4,
  firstChapter: 94,
  lastChapter: 413,
  characterClaims: "jsonl",
  aliasOf: "world-character/revi-cotton",
} as const satisfies WorldCharacter
