import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const leon = {
  id: "01a0b70b-816b-7563-9e05-666b018a3bfa",
  type: "page-type/world-character",
  slug: "leon",
  title: "Leon",
  world: "world/the-wandering-inn",
  firstChapter: 109,
  lastChapter: 775,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
