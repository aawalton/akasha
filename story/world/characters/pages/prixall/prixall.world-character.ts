import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const prixall = {
  id: "01a0b70c-75ab-78e6-8878-91186bcc94a7",
  type: "page-type/world-character",
  slug: "prixall",
  title: "Prixall",
  world: "world/the-wandering-inn",
  firstChapter: 616,
  lastChapter: 723,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
