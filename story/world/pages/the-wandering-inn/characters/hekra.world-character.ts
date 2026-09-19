import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hekra = {
  id: "01a0b70a-f7ce-7b65-b97c-b8d958db05a8",
  type: "page-type/world-character",
  slug: "hekra",
  title: "Hekra",
  world: "world/the-wandering-inn",
  firstChapter: 106,
  lastChapter: 107,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
