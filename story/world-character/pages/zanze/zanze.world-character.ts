import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zanze = {
  id: "01a0b70d-e852-7398-95c9-f1d0d25524ac",
  type: "page-type/world-character",
  slug: "zanze",
  title: "Zanze",
  world: "world/the-wandering-inn",
  firstChapter: 650,
  lastChapter: 650,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
