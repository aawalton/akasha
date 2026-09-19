import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lordTyrionVeltras = {
  id: "01a0b70b-8bd9-7e5d-a218-4dd8cea0062d",
  type: "page-type/world-character",
  slug: "lord-tyrion-veltras",
  title: "Tyrion Veltras",
  world: "world/the-wandering-inn",
  firstChapter: 112,
  lastChapter: 466,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
