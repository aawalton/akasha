import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cazcall = {
  id: "01a0b709-f826-775d-ad3c-dc54491570fd",
  type: "page-type/world-character",
  slug: "cazcall",
  title: "Cazcall",
  world: "world/the-wandering-inn",
  firstChapter: 668,
  lastChapter: 668,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
