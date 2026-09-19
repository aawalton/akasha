import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const watchCaptain = {
  id: "01a0b70d-9ab0-7175-af5e-4b4f1b12b819",
  type: "page-type/world-character",
  slug: "watch-captain",
  title: "the Watch Captain",
  world: "world/the-wandering-inn",
  firstChapter: 33,
  lastChapter: 33,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
