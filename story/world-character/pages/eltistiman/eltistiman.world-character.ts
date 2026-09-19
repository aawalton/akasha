import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eltistiman = {
  id: "01a0b70a-6729-73ba-a036-77ac733105ac",
  type: "page-type/world-character",
  slug: "eltistiman",
  title: "Eltistiman Verdue",
  world: "world/the-wandering-inn",
  firstChapter: 296,
  lastChapter: 413,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
