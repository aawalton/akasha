import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const strategistVeine = {
  id: "01a0b70d-0f8a-74b8-8216-04b966904f35",
  type: "page-type/world-character",
  slug: "strategist-veine",
  title: "Veine",
  world: "world/the-wandering-inn",
  firstChapter: 646,
  lastChapter: 646,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
