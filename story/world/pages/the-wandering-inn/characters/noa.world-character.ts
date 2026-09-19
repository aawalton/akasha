import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const noa = {
  id: "01a0b70c-0a0c-7578-b46d-95e6ef7a0335",
  type: "page-type/world-character",
  slug: "noa",
  title: "Noa",
  world: "world/the-wandering-inn",
  firstChapter: 497,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
