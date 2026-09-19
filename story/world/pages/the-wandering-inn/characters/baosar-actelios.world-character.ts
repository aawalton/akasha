import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const baosarActelios = {
  id: "01a0b707-798d-7a6b-bf0c-3cd0f0e5d8db",
  type: "page-type/world-character",
  slug: "baosar-actelios",
  title: "Baosar of A'ctelios",
  world: "world/the-wandering-inn",
  firstChapter: 399,
  lastChapter: 399,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
