import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theofore = {
  id: "01a0b70d-2350-764f-97b8-aa9d520d0209",
  type: "page-type/world-character",
  slug: "theofore",
  title: "Theofore",
  world: "world/the-wandering-inn",
  firstChapter: 43,
  lastChapter: 230,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
