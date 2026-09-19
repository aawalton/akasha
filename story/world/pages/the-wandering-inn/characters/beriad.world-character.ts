import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const beriad = {
  id: "01a0b707-811d-7cbe-b274-662511af7897",
  type: "page-type/world-character",
  slug: "beriad",
  title: "Beriad",
  world: "world/the-wandering-inn",
  firstChapter: 563,
  lastChapter: 563,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
