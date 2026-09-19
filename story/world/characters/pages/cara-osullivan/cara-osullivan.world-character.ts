import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const caraOsullivan = {
  id: "01a0b709-f423-7774-b465-c315e234add7",
  type: "page-type/world-character",
  slug: "cara-osullivan",
  title: "Cara O'Sullivan",
  world: "world/the-wandering-inn",
  firstChapter: 422,
  lastChapter: 574,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
