import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rellmel = {
  id: "01a0b70c-8fdc-77eb-91eb-776fbb6996e0",
  type: "page-type/world-character",
  slug: "rellmel",
  title: "Rellmel",
  world: "world/the-wandering-inn",
  firstChapter: 494,
  lastChapter: 494,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
