import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const qualletMarshhand = {
  id: "01a0b70c-78b3-7a88-bec0-7ef81564b533",
  type: "page-type/world-character",
  slug: "quallet-marshhand",
  title: "Quallet Marshhand",
  world: "world/the-wandering-inn",
  firstChapter: 195,
  lastChapter: 197,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
