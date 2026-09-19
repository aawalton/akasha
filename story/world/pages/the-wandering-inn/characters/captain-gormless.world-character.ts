import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const captainGormless = {
  id: "01a0b707-92be-77fb-adec-c13ce82554f8",
  type: "page-type/world-character",
  slug: "captain-gormless",
  title: "Gormless",
  world: "world/the-wandering-inn",
  firstChapter: 811,
  lastChapter: 811,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
