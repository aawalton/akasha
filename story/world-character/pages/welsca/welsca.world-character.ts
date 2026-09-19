import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const welsca = {
  id: "01a0b70d-9bda-756f-94be-0cf5cff04551",
  type: "page-type/world-character",
  slug: "welsca",
  title: "Welsca",
  world: "world/the-wandering-inn",
  firstChapter: 322,
  lastChapter: 322,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
