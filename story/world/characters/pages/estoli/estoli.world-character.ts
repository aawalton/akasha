import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const estoli = {
  id: "01a0b70a-747b-767a-914b-0a53a560e09e",
  type: "page-type/world-character",
  slug: "estoli",
  title: "Estoli",
  world: "world/the-wandering-inn",
  firstChapter: 808,
  lastChapter: 808,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
