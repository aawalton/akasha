import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mrshaAlternate = {
  id: "01a0b70b-faab-7788-96ec-6e4c2de7749e",
  type: "page-type/world-character",
  slug: "mrsha-alternate",
  title: "Alternate Mrsha",
  world: "world/the-wandering-inn",
  firstChapter: 740,
  lastChapter: 740,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
