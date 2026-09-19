import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const caddin = {
  id: "01a0b707-8c0a-702c-a457-528b3db9f5f7",
  type: "page-type/world-character",
  slug: "caddin",
  title: "Caddin",
  world: "world/the-wandering-inn",
  firstChapter: 329,
  lastChapter: 329,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
