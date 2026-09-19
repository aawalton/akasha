import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mousebite = {
  id: "01a0b70b-f817-7150-8f4f-ec98f9c77eab",
  type: "page-type/world-character",
  slug: "mousebite",
  title: "Mousebite",
  world: "world/the-wandering-inn",
  firstChapter: 717,
  lastChapter: 717,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
