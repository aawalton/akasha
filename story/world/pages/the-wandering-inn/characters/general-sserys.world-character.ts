import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const generalSserys = {
  id: "01a0b70a-961f-713c-830b-6310d088ba01",
  type: "page-type/world-character",
  slug: "general-sserys",
  title: "Sserys",
  world: "world/the-wandering-inn",
  firstChapter: 111,
  lastChapter: 442,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
