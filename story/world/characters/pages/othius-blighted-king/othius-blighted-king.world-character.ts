import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const othiusBlightedKing = {
  id: "01a0b70c-1eb9-79f1-96fb-7916d50842c2",
  type: "page-type/world-character",
  slug: "othius-blighted-king",
  title: "Othius",
  world: "world/the-wandering-inn",
  firstChapter: 437,
  lastChapter: 437,
  characterClaims: "jsonl",
  aliasOf: "world-character/othius-iv",
} as const satisfies WorldCharacter
