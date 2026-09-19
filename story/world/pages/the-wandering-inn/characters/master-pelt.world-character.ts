import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const masterPelt = {
  id: "01a0b70b-9eba-7f68-9b03-00d35b308e95",
  type: "page-type/world-character",
  slug: "master-pelt",
  title: "Master Pelt",
  world: "world/the-wandering-inn",
  firstChapter: 788,
  lastChapter: 788,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
