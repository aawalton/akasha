import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const secondEditionGrandDesign = {
  id: "01a0b70c-ef54-7520-bf40-565ebc42e957",
  type: "page-type/world-character",
  slug: "second-edition-grand-design",
  title: "Second Edition",
  world: "world/the-wandering-inn",
  firstChapter: 762,
  lastChapter: 762,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
