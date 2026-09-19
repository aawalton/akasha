import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const visionTiregal = {
  id: "01a0b70d-952b-79ba-8534-155b7174c9ce",
  type: "page-type/world-character",
  slug: "vision-tiregal",
  title: "Vision Tiregal",
  world: "world/the-wandering-inn",
  firstChapter: 782,
  lastChapter: 782,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
