import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const merindiusKnightCaptain = {
  id: "01a0b70b-e8f5-76ac-bf5a-2a37c5734488",
  type: "page-type/world-character",
  slug: "merindius-knight-captain",
  title: "Merindius",
  world: "world/the-wandering-inn",
  firstChapter: 715,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
