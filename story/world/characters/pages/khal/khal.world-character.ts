import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const khal = {
  id: "01a0b70b-68aa-710d-a0bd-ba823243876d",
  type: "page-type/world-character",
  slug: "khal",
  title: "Brigadier General Khal",
  world: "world/the-wandering-inn",
  firstChapter: 242,
  lastChapter: 242,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
