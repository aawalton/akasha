import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const werdinBlackwing = {
  id: "01a0b70d-9c8d-7ec7-9f5b-6cbddc080a39",
  type: "page-type/world-character",
  slug: "werdin-blackwing",
  title: "Werdin Blackwing",
  world: "world/the-wandering-inn",
  firstChapter: 792,
  lastChapter: 792,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
