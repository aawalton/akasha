import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sidney = {
  id: "01a0b70c-ffa5-7503-b397-61f23b89424b",
  type: "page-type/world-character",
  slug: "sidney",
  title: "Sidney",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 431,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
