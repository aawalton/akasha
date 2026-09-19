import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const torishiWeatherfur = {
  id: "01a0b70d-6e22-755a-b7b4-4b44a1ad0271",
  type: "page-type/world-character",
  slug: "torishi-weatherfur",
  title: "Torishi Weatherfur",
  world: "world/the-wandering-inn",
  firstChapter: 586,
  lastChapter: 586,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
