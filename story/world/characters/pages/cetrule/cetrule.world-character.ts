import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cetrule = {
  id: "01a0b709-fc4f-7d0a-b131-adffb98971c3",
  type: "page-type/world-character",
  slug: "cetrule",
  title: "Cetrule",
  world: "world/the-wandering-inn",
  firstChapter: 564,
  lastChapter: 565,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
