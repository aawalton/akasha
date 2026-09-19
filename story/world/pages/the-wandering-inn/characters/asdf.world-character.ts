import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const asdf = {
  id: "01a0b707-748a-794b-b415-386a45f8566b",
  type: "page-type/world-character",
  slug: "asdf",
  title: "asdf",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
