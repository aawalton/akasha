import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const saimh = {
  id: "01a0b70c-a7fa-7c6e-9629-97437f2d12dc",
  type: "page-type/world-character",
  slug: "saimh",
  title: "Saimh",
  world: "world/the-wandering-inn",
  firstChapter: 594,
  lastChapter: 594,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
