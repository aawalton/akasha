import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const trollWithSword = {
  id: "01a0b70d-7299-79cc-883e-bca2aedd3980",
  type: "page-type/world-character",
  slug: "troll-with-sword",
  title: "the Troll with the sword",
  world: "world/the-wandering-inn",
  firstChapter: 723,
  lastChapter: 723,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
