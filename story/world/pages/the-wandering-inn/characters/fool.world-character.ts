import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fool = {
  id: "01a0b70a-8bcc-7077-a3e2-cfeb2ba9f286",
  type: "page-type/world-character",
  slug: "fool",
  title: "The Fool",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 218,
  lastChapter: 218,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:56.812Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
