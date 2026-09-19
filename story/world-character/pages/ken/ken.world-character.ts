import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ken = {
  id: "01a0b70b-6206-71e8-a8f7-3e1d5c0e2b79",
  type: "page-type/world-character",
  slug: "ken",
  title: "Kenjiro Murata",
  world: "world/the-wandering-inn",
  firstChapter: 199,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
