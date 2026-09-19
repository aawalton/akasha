import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const orreh = {
  id: "01a0b70c-1bd2-7e62-ba1f-d454f0e5e9df",
  type: "page-type/world-character",
  slug: "orreh",
  title: "Orreh",
  world: "world/the-wandering-inn",
  firstChapter: 599,
  lastChapter: 599,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
