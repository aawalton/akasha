import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const persua = {
  id: "01a0b70c-29d8-7412-ba43-d62949cdfb85",
  type: "page-type/world-character",
  slug: "persua",
  title: "Persua",
  world: "world/the-wandering-inn",
  firstChapter: 29,
  lastChapter: 601,
  characterClaims: "jsonl",
  aliasOf: "world-character/persua-mavva",
} as const satisfies WorldCharacter
