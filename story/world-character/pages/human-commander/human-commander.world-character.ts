import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const humanCommander = {
  id: "01a0b70b-028e-78a7-8398-acd1039de80c",
  type: "page-type/world-character",
  slug: "human-commander",
  title: "The Human [Commander]",
  world: "world/the-wandering-inn",
  firstChapter: 232,
  lastChapter: 232,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
