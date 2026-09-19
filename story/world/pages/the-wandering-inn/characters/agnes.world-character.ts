import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const agnes = {
  id: "01a0b707-6545-7ca3-8d09-7ac83876e59b",
  type: "page-type/world-character",
  slug: "agnes",
  title: "Agnes",
  world: "world/the-wandering-inn",
  firstChapter: 122,
  lastChapter: 127,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
