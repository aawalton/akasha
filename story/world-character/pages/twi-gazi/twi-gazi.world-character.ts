import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const twiGazi = {
  id: "01a0b70d-7526-7bc5-9e9b-9c08c00c1437",
  type: "page-type/world-character",
  slug: "twi-gazi",
  title: "Gazi",
  world: "world/the-wandering-inn",
  firstChapter: 180,
  lastChapter: 180,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
