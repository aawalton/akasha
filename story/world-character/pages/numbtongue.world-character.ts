import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const numbtongue = {
  id: "01a06580-2495-73d1-baa0-997a8b62411f",
  type: "page-type/world-character",
  slug: "numbtongue",
  title: "Numbtongue",
  world: "world/the-wandering-inn",
  maxLevel: 35,
  eventCount: 22,
  firstChapter: 146,
  lastChapter: 763,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
