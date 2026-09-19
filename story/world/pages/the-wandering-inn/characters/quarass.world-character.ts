import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const quarass = {
  id: "01a0b70c-78ee-7507-b65e-eec88d51d965",
  type: "page-type/world-character",
  slug: "quarass",
  title: "Quarass",
  world: "world/the-wandering-inn",
  firstChapter: 370,
  lastChapter: 808,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
