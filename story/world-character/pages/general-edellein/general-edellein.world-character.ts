import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const generalEdellein = {
  id: "01a0b70a-951a-74a3-a56f-87e8eed2abeb",
  type: "page-type/world-character",
  slug: "general-edellein",
  title: "General Edellein",
  world: "world/the-wandering-inn",
  firstChapter: 763,
  lastChapter: 763,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
