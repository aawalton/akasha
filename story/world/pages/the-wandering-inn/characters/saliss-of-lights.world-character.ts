import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const salissOfLights = {
  id: "01a0b70c-aafe-7163-9fb7-c9b5590c0a36",
  type: "page-type/world-character",
  slug: "saliss-of-lights",
  title: "Saliss",
  world: "world/the-wandering-inn",
  firstChapter: 415,
  lastChapter: 737,
  characterClaims: "jsonl",
  aliasOf: "world-character/saliss",
} as const satisfies WorldCharacter
