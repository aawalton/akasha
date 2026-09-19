import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const timorDuHavrington = {
  id: "01a0b70d-64e4-7304-aa39-541bc1fd743e",
  type: "page-type/world-character",
  slug: "timor-du-havrington",
  title: "Timor du Havrington",
  world: "world/the-wandering-inn",
  firstChapter: 158,
  lastChapter: 161,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
