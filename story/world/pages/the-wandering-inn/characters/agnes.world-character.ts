import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const agnes = {
  id: "01a0b707-6545-7ca3-8d09-7ac83876e59b",
  type: "page-type/world-character",
  slug: "agnes",
  title: "Agnes",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 122,
  lastChapter: 127,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:30.341Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
