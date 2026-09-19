import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tallguardCein = {
  id: "01a0b70d-1291-7e65-bf12-731ce0d6a19e",
  type: "page-type/world-character",
  slug: "tallguard-cein",
  title: "Cein",
  world: "world/the-wandering-inn",
  firstChapter: 643,
  lastChapter: 643,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
