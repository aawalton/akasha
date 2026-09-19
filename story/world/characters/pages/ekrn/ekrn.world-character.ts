import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ekrn = {
  id: "01a0b70a-24bf-717b-b09d-c158e9990ee4",
  type: "page-type/world-character",
  slug: "ekrn",
  title: "Ekrn",
  world: "world/the-wandering-inn",
  firstChapter: 497,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
