import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nesor = {
  id: "01a0b70c-0880-78d1-a53c-abe081d333f9",
  type: "page-type/world-character",
  slug: "nesor",
  title: "Nesor",
  world: "world/the-wandering-inn",
  firstChapter: 221,
  lastChapter: 350,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
