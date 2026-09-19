import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const maresarBanditLord = {
  id: "01a0b70b-9a3a-75ad-a95a-f53b17a6c4fb",
  type: "page-type/world-character",
  slug: "maresar-bandit-lord",
  title: "Maresar",
  world: "world/the-wandering-inn",
  firstChapter: 559,
  lastChapter: 559,
  characterClaims: "jsonl",
  aliasOf: "world-character/maresar",
} as const satisfies WorldCharacter
