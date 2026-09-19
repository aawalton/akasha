import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dullahanSoldier = {
  id: "01a0b70a-1f6e-7650-b086-9acdd261ce3e",
  type: "page-type/world-character",
  slug: "dullahan-soldier",
  title: "the Dullahan soldier",
  world: "world/the-wandering-inn",
  firstChapter: 130,
  lastChapter: 130,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
