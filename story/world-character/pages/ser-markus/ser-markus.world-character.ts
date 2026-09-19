import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const serMarkus = {
  id: "01a0b70c-f3cf-7c6c-8ed6-cd01b95a4bb1",
  type: "page-type/world-character",
  slug: "ser-markus",
  title: "Markus",
  world: "world/the-wandering-inn",
  firstChapter: 539,
  lastChapter: 539,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
