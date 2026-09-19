import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const calirn = {
  id: "01a0b707-8f81-7231-8605-a3a0a3e327da",
  type: "page-type/world-character",
  slug: "calirn",
  title: "Calirn",
  world: "world/the-wandering-inn",
  firstChapter: 358,
  lastChapter: 507,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
