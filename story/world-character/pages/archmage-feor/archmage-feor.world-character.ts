import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const archmageFeor = {
  id: "01a0b707-70f1-70de-bbaa-1c5a4d4c990a",
  type: "page-type/world-character",
  slug: "archmage-feor",
  title: "Feor",
  world: "world/the-wandering-inn",
  firstChapter: 164,
  lastChapter: 556,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
