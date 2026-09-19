import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const charlesDeTrevalier = {
  id: "01a0b709-fd56-7a27-8b69-48219a1a8e02",
  type: "page-type/world-character",
  slug: "charles-de-trevalier",
  title: "Charles de Trevalier",
  world: "world/the-wandering-inn",
  firstChapter: 158,
  lastChapter: 161,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
