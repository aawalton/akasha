import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const guardsmanWesle = {
  id: "01a0b70a-ecfe-71b3-85f5-883b2d0763ad",
  type: "page-type/world-character",
  slug: "guardsman-wesle",
  title: "Guardsman Wesle",
  world: "world/the-wandering-inn",
  firstChapter: 21,
  lastChapter: 21,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
