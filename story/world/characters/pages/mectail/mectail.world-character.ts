import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mectail = {
  id: "01a0b70b-e3e5-7de7-a548-126afd4b5a4d",
  type: "page-type/world-character",
  slug: "mectail",
  title: "Mectail",
  world: "world/the-wandering-inn",
  firstChapter: 542,
  lastChapter: 797,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
