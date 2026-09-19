import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pellmiaQuellae = {
  id: "01a0b70c-2815-7dd0-b510-74047fffb2c1",
  type: "page-type/world-character",
  slug: "pellmia-quellae",
  title: "Pellmia Quellae",
  world: "world/the-wandering-inn",
  firstChapter: 664,
  lastChapter: 664,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
