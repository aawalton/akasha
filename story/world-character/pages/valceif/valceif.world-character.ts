import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const valceif = {
  id: "01a0b70d-848e-7a4f-a15d-3313378d29db",
  type: "page-type/world-character",
  slug: "valceif",
  title: "Valceif Godfrey",
  world: "world/the-wandering-inn",
  firstChapter: 170,
  lastChapter: 750,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
