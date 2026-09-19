import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const springWarden = {
  id: "01a0b70d-0c30-7267-85c3-b8a462b4f85e",
  type: "page-type/world-character",
  slug: "spring-warden",
  title: "Spring's Warden",
  world: "world/the-wandering-inn",
  firstChapter: 490,
  lastChapter: 490,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
