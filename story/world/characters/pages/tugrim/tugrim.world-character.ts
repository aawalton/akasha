import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tugrim = {
  id: "01a0b70d-7401-75d0-add3-149ce8070489",
  type: "page-type/world-character",
  slug: "tugrim",
  title: "Tugrim",
  world: "world/the-wandering-inn",
  firstChapter: 239,
  lastChapter: 239,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
