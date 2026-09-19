import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sapkiMekhita = {
  id: "01a0b70c-e9cb-785e-861a-6972bccc0e33",
  type: "page-type/world-character",
  slug: "sapki-mekhita",
  title: "Sapki Mekhita",
  world: "world/the-wandering-inn",
  firstChapter: 399,
  lastChapter: 399,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
