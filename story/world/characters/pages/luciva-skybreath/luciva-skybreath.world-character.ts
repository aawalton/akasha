import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lucivaSkybreath = {
  id: "01a0b70b-8fcd-7617-9c19-535ce8ed0102",
  type: "page-type/world-character",
  slug: "luciva-skybreath",
  title: "Luciva Skybreath",
  world: "world/the-wandering-inn",
  firstChapter: 345,
  lastChapter: 391,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
