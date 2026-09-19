import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wullst = {
  id: "01a0b70d-a1be-7003-80f9-d19e85d92be3",
  type: "page-type/world-character",
  slug: "wullst",
  title: "Wullst",
  world: "world/the-wandering-inn",
  firstChapter: 208,
  lastChapter: 208,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
