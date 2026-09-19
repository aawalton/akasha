import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const iratze = {
  id: "01a0b70b-10cf-73c4-95a4-acef9cf45864",
  type: "page-type/world-character",
  slug: "iratze",
  title: "Iratze",
  world: "world/the-wandering-inn",
  firstChapter: 402,
  lastChapter: 636,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
