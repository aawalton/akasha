import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lintl = {
  id: "01a0b70b-8561-7808-9a9b-0b863eef7546",
  type: "page-type/world-character",
  slug: "lintl",
  title: "Lintl",
  world: "world/the-wandering-inn",
  firstChapter: 799,
  lastChapter: 799,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
