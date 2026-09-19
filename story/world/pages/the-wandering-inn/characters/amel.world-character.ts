import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const amel = {
  id: "01a0b707-6ba1-75dc-a000-07e86fff9050",
  type: "page-type/world-character",
  slug: "amel",
  title: "Amel",
  world: "world/the-wandering-inn",
  firstChapter: 817,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
