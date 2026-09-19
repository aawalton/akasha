import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zimrah = {
  id: "01a0b70d-ee4b-76ee-b2cc-6217ef848d9c",
  type: "page-type/world-character",
  slug: "zimrah",
  title: "Zimrah",
  world: "world/the-wandering-inn",
  firstChapter: 562,
  lastChapter: 605,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
