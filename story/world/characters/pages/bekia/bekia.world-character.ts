import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bekia = {
  id: "01a0b707-7f00-7782-844a-94754155c929",
  type: "page-type/world-character",
  slug: "bekia",
  title: "Bekia",
  world: "world/the-wandering-inn",
  firstChapter: 230,
  lastChapter: 387,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
