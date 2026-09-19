import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hobusMacreid = {
  id: "01a0b70a-fef3-754c-ac3b-787fc0fcc4f9",
  type: "page-type/world-character",
  slug: "hobus-macreid",
  title: "Hobus Macreid",
  world: "world/the-wandering-inn",
  firstChapter: 820,
  lastChapter: 820,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
