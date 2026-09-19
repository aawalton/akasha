import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const generalVexil = {
  id: "01a0b70a-9691-7403-8f01-8dd4ea7427dc",
  type: "page-type/world-character",
  slug: "general-vexil",
  title: "Vexil",
  world: "world/the-wandering-inn",
  firstChapter: 512,
  lastChapter: 512,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
