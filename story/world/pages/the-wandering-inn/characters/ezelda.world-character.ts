import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ezelda = {
  id: "01a0b70a-7817-7745-9190-784d58672010",
  type: "page-type/world-character",
  slug: "ezelda",
  title: "Ezelda",
  world: "world/the-wandering-inn",
  firstChapter: 695,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
