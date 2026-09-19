import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sitqTheSetter = {
  id: "01a0b70d-03cc-7bfb-a9a2-dece982fe888",
  type: "page-type/world-character",
  slug: "sitq-the-setter",
  title: "Sitq",
  world: "world/the-wandering-inn",
  firstChapter: 546,
  lastChapter: 546,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
