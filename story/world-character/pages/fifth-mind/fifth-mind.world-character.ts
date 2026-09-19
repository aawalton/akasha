import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const fifthMind = {
  id: "01a0b70a-86df-7f46-a98f-1301ec98a6de",
  type: "page-type/world-character",
  slug: "fifth-mind",
  title: "Fifth Mind",
  world: "world/the-wandering-inn",
  firstChapter: 617,
  lastChapter: 617,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
