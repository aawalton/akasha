import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const luciva = {
  id: "01a0b70b-8f93-72fb-8ad9-9c6947c484d3",
  type: "page-type/world-character",
  slug: "luciva",
  title: "Luciva",
  world: "world/the-wandering-inn",
  firstChapter: 803,
  lastChapter: 810,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
