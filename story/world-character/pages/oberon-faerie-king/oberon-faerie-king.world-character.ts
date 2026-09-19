import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const oberonFaerieKing = {
  id: "01a0b70c-13df-7e54-bc4c-de6e59eb5c70",
  type: "page-type/world-character",
  slug: "oberon-faerie-king",
  title: "Oberon",
  world: "world/the-wandering-inn",
  firstChapter: 482,
  lastChapter: 482,
  characterClaims: "jsonl",
  aliasOf: "world-character/oberon",
} as const satisfies WorldCharacter
