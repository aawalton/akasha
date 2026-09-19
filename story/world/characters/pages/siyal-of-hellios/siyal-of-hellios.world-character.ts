import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const siyalOfHellios = {
  id: "01a0b70d-0474-760e-a67a-1fd422ca6b39",
  type: "page-type/world-character",
  slug: "siyal-of-hellios",
  title: "Siyal",
  world: "world/the-wandering-inn",
  firstChapter: 181,
  lastChapter: 181,
  characterClaims: "jsonl",
  aliasOf: "world-character/siyal",
} as const satisfies WorldCharacter
