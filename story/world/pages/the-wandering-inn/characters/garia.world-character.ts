import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const garia = {
  id: "01a0b70a-9178-72d2-bc4c-19ea540ed90a",
  type: "page-type/world-character",
  slug: "garia",
  title: "Garia",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  firstChapter: 36,
  lastChapter: 352,
  characterClaims: "jsonl",
  aliasOf: "world-character/garia-strongheart",
  createdAt: "2026-09-19T00:21:58.264Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
