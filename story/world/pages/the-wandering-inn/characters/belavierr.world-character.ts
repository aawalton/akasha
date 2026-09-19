import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const belavierr = {
  id: "01a0b707-7f33-72f4-bc55-cc7b393754c5",
  type: "page-type/world-character",
  slug: "belavierr",
  title: "Belavierr",
  world: "world/the-wandering-inn",
  firstChapter: 351,
  lastChapter: 758,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
