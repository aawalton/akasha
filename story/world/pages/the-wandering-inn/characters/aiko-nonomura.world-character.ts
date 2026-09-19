import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const aikoNonomura = {
  id: "01a0b707-665c-77d7-a576-241020682376",
  type: "page-type/world-character",
  slug: "aiko-nonomura",
  title: "Aiko Nonomura",
  world: "world/the-wandering-inn",
  firstChapter: 195,
  lastChapter: 318,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
