import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nekhti = {
  id: "01a0b70c-0447-79ae-bedc-4a154fbcfd40",
  type: "page-type/world-character",
  slug: "nekhti",
  title: "Nekhti",
  world: "world/the-wandering-inn",
  firstChapter: 412,
  lastChapter: 412,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
