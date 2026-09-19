import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rital = {
  id: "01a0b70c-9a74-72a6-9317-9e6f5449e0cf",
  type: "page-type/world-character",
  slug: "rital",
  title: "Rital",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 317,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
