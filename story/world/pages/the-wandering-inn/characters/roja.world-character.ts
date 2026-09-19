import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const roja = {
  id: "01a0b70c-9c48-76e5-bf77-51598e89090c",
  type: "page-type/world-character",
  slug: "roja",
  title: "Roja",
  world: "world/the-wandering-inn",
  firstChapter: 736,
  lastChapter: 736,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
