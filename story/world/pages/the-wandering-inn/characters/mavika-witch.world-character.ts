import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mavikaWitch = {
  id: "01a0b70b-dfa5-7098-ba7d-8ef604e84918",
  type: "page-type/world-character",
  slug: "mavika-witch",
  title: "Mavika",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 395,
  lastChapter: 395,
  characterClaims: "jsonl",
  aliasOf: "world-character/mavika",
  createdAt: "2026-09-19T00:23:23.813Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
