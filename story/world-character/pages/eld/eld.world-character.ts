import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eld = {
  id: "01a0b70a-24f4-7d74-a28a-6e5234f0a504",
  type: "page-type/world-character",
  slug: "eld",
  title: "Eldertuin",
  world: "world/the-wandering-inn",
  firstChapter: 616,
  lastChapter: 616,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
