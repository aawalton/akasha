import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const carpenterLaikos = {
  id: "01a0b709-f506-77bb-aa71-3ed6746eabc7",
  type: "page-type/world-character",
  slug: "carpenter-laikos",
  title: "Carpenter Laikos",
  world: "world/the-wandering-inn",
  firstChapter: 779,
  lastChapter: 779,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
