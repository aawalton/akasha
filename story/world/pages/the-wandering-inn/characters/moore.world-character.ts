import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const moore = {
  id: "01a0b70b-f733-7b58-adb4-9eeb098a2db6",
  type: "page-type/world-character",
  slug: "moore",
  title: "Moore",
  world: "world/the-wandering-inn",
  firstChapter: 96,
  lastChapter: 786,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
