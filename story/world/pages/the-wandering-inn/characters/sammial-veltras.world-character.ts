import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sammialVeltras = {
  id: "01a0b70c-ac5e-7233-acc5-ad21f1a6b426",
  type: "page-type/world-character",
  slug: "sammial-veltras",
  title: "Sammial Veltras",
  world: "world/the-wandering-inn",
  firstChapter: 425,
  lastChapter: 690,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
