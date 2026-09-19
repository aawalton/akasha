import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const raelt = {
  id: "01a0b70c-7ff9-7430-83bc-bc244cecc252",
  type: "page-type/world-character",
  slug: "raelt",
  title: "Raelt",
  world: "world/the-wandering-inn",
  firstChapter: 326,
  lastChapter: 703,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
