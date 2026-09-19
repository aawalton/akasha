import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const demsleth = {
  id: "01a0b70a-16fd-7b82-80bc-7aaa0c1d0613",
  type: "page-type/world-character",
  slug: "demsleth",
  title: "Demsleth",
  world: "world/the-wandering-inn",
  firstChapter: 631,
  lastChapter: 751,
  characterClaims: "jsonl",
  aliasOf: "world-character/teriarch",
} as const satisfies WorldCharacter
