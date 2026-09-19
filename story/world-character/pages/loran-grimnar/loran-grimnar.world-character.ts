import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const loranGrimnar = {
  id: "01a0b70b-887c-7b7e-8f82-37591f40d4a1",
  type: "page-type/world-character",
  slug: "loran-grimnar",
  title: "Loran Grimnar",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 111,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
