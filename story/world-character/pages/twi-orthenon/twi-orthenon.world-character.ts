import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const twiOrthenon = {
  id: "01a0b70d-75d8-75e2-981f-d37e3232fa9a",
  type: "page-type/world-character",
  slug: "twi-orthenon",
  title: "Orthenon",
  world: "world/the-wandering-inn",
  firstChapter: 180,
  lastChapter: 180,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
