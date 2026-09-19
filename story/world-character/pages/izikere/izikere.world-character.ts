import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const izikere = {
  id: "01a0b70b-1732-7920-86ef-8088a455de47",
  type: "page-type/world-character",
  slug: "izikere",
  title: "Izikere the Guardian",
  world: "world/the-wandering-inn",
  firstChapter: 594,
  lastChapter: 810,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
