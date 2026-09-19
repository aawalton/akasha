import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const faleneSkystrall = {
  id: "01a0b70a-7a2b-72c7-be0f-53f9d899627f",
  type: "page-type/world-character",
  slug: "falene-skystrall",
  title: "Falene Skystrall",
  world: "world/the-wandering-inn",
  firstChapter: 247,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
