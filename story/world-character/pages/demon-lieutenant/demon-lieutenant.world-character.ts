import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const demonLieutenant = {
  id: "01a0b70a-16c5-7f9e-a023-a49965472f76",
  type: "page-type/world-character",
  slug: "demon-lieutenant",
  title: "the Demon Officer",
  world: "world/the-wandering-inn",
  firstChapter: 98,
  lastChapter: 98,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
