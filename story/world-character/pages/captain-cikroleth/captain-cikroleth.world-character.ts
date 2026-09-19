import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const captainCikroleth = {
  id: "01a0b707-9229-7b56-9c4d-798bf071ac76",
  type: "page-type/world-character",
  slug: "captain-cikroleth",
  title: "Cikroleth",
  world: "world/the-wandering-inn",
  firstChapter: 808,
  lastChapter: 808,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
