import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const todel = {
  id: "01a0b70d-68ac-7570-8fb6-9738a82948c8",
  type: "page-type/world-character",
  slug: "todel",
  title: "Todel",
  world: "world/the-wandering-inn",
  firstChapter: 336,
  lastChapter: 336,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
