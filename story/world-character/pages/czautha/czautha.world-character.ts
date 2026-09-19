import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const czautha = {
  id: "01a0b70a-0db4-78b6-b928-e21cd9a780e9",
  type: "page-type/world-character",
  slug: "czautha",
  title: "Czautha",
  world: "world/the-wandering-inn",
  firstChapter: 523,
  lastChapter: 710,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
