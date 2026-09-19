import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const laskaillia = {
  id: "01a0b70b-7df3-79fa-8d37-c083be671ac0",
  type: "page-type/world-character",
  slug: "laskaillia",
  title: "Laskaillia",
  world: "world/the-wandering-inn",
  firstChapter: 292,
  lastChapter: 292,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
