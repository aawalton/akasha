import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const feya = {
  id: "01a0b70a-8405-787d-889b-510b6bcb3fc5",
  type: "page-type/world-character",
  slug: "feya",
  title: "Feya",
  world: "world/the-wandering-inn",
  firstChapter: 138,
  lastChapter: 138,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
