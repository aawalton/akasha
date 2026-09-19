import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const dakelos = {
  id: "01a0b70a-0e4f-77de-beb8-de916b76a879",
  type: "page-type/world-character",
  slug: "dakelos",
  title: "Admiral Dakelos",
  world: "world/the-wandering-inn",
  firstChapter: 731,
  lastChapter: 731,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
