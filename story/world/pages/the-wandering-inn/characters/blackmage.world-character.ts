import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const blackmage = {
  id: "01a0b707-86cf-7c4e-8241-9ac403838aba",
  type: "page-type/world-character",
  slug: "blackmage",
  title: "BlackMage",
  world: "world/the-wandering-inn",
  firstChapter: 111,
  lastChapter: 173,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
