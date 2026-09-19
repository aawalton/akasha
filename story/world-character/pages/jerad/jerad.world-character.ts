import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jerad = {
  id: "01a0b70b-1e8b-7e33-9a4e-cb93418f8302",
  type: "page-type/world-character",
  slug: "jerad",
  title: "Jerad Riels",
  world: "world/the-wandering-inn",
  firstChapter: 119,
  lastChapter: 119,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
