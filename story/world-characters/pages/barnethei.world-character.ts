import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const barnethei = {
  id: "01a06580-2494-7e15-843c-a26c18e3268a",
  type: "world-character",
  slug: "barnethei",
  title: "Barnethei",
  world: "the-wandering-inn",
  maxLevel: 46,
  eventCount: 8,
  firstChapter: 772,
  lastChapter: 772,
} as const satisfies WorldCharacter
