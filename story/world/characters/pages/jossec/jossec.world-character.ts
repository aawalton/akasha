import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jossec = {
  id: "01a0b70b-22b2-7e93-9628-9b0e70f3bd5e",
  type: "page-type/world-character",
  slug: "jossec",
  title: "Jossec",
  world: "world/the-wandering-inn",
  firstChapter: 736,
  lastChapter: 736,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
