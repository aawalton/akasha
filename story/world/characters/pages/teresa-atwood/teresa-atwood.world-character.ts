import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const teresaAtwood = {
  id: "01a0b70d-17ea-726f-b23c-0544c80c4f92",
  type: "page-type/world-character",
  slug: "teresa-atwood",
  title: "Teresa Atwood",
  world: "world/the-wandering-inn",
  firstChapter: 453,
  lastChapter: 556,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
