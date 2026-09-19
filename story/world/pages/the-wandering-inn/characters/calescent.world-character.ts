import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const calescent = {
  id: "01a0b707-8d7f-72b5-96f3-030acb468949",
  type: "page-type/world-character",
  slug: "calescent",
  title: "Calescent",
  world: "world/the-wandering-inn",
  firstChapter: 409,
  lastChapter: 737,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
