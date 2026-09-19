import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const okasha = {
  id: "01a0b70c-15e7-7668-a123-ea766c06ad48",
  type: "page-type/world-character",
  slug: "okasha",
  title: "Okasha",
  world: "world/the-wandering-inn",
  firstChapter: 131,
  lastChapter: 618,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
