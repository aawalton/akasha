import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const itkisa = {
  id: "01a0b70b-15e6-7e23-803b-9cb8de3e2874",
  type: "page-type/world-character",
  slug: "itkisa",
  title: "Itkisa",
  world: "world/the-wandering-inn",
  firstChapter: 670,
  lastChapter: 671,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
