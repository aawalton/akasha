import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const onievaOliwing = {
  id: "01a0b70c-18e5-7f42-9d82-73f4be440f2d",
  type: "page-type/world-character",
  slug: "onieva-oliwing",
  title: "Onieva",
  world: "world/the-wandering-inn",
  firstChapter: 415,
  lastChapter: 415,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
