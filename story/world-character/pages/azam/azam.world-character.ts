import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const azam = {
  id: "01a0b707-7731-758d-a007-e9aa207e8cd2",
  type: "page-type/world-character",
  slug: "azam",
  title: "Azam",
  world: "world/the-wandering-inn",
  firstChapter: 523,
  lastChapter: 523,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
