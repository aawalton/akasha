import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const reagen = {
  id: "01a0b70c-8851-7a2a-9186-02d9219769ad",
  type: "page-type/world-character",
  slug: "reagen",
  title: "Reagen",
  world: "world/the-wandering-inn",
  firstChapter: 627,
  lastChapter: 627,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
