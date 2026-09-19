import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const takhatres = {
  id: "01a0b70d-11b4-7868-ae3f-d74146c7c588",
  type: "page-type/world-character",
  slug: "takhatres",
  title: "Takhatres",
  world: "world/the-wandering-inn",
  firstChapter: 92,
  lastChapter: 790,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
