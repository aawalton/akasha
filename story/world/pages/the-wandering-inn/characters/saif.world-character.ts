import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const saif = {
  id: "01a0b70c-a78b-7b0f-8d7a-084319b7bfb3",
  type: "page-type/world-character",
  slug: "saif",
  title: "Saif",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 431,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
