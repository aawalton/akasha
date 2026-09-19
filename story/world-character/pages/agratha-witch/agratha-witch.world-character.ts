import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const agrathaWitch = {
  id: "01a0b707-65b4-7f45-b1d2-87a80a010811",
  type: "page-type/world-character",
  slug: "agratha-witch",
  title: "Agratha",
  world: "world/the-wandering-inn",
  firstChapter: 349,
  lastChapter: 349,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
