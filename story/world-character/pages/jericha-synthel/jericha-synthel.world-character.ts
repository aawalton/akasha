import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jerichaSynthel = {
  id: "01a0b70b-1f33-75c7-b998-868f81dd0b2d",
  type: "page-type/world-character",
  slug: "jericha-synthel",
  title: "Jericha Synthel",
  world: "world/the-wandering-inn",
  firstChapter: 474,
  lastChapter: 474,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
