import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const welcaCaveis = {
  id: "01a0b70d-9b9e-779c-8031-564e1214a6ed",
  type: "page-type/world-character",
  slug: "welca-caveis",
  title: "Welca Caveis",
  world: "world/the-wandering-inn",
  firstChapter: 260,
  lastChapter: 337,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
