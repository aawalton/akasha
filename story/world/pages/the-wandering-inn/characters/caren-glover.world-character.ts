import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const carenGlover = {
  id: "01a0b709-f483-78a7-a412-8c7d5a5add8d",
  type: "page-type/world-character",
  slug: "caren-glover",
  title: "caren glover",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
