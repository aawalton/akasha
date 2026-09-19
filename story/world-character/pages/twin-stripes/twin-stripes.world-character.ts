import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const twinStripes = {
  id: "01a0b70d-76fc-7cc8-a8d0-0797d4621c9b",
  type: "page-type/world-character",
  slug: "twin-stripes",
  title: "Twin Stripes",
  world: "world/the-wandering-inn",
  firstChapter: 226,
  lastChapter: 228,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
