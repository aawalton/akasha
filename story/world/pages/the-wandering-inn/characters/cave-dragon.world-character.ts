import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const caveDragon = {
  id: "01a0b705-e74f-7278-9eb8-4bc030975313",
  type: "page-type/world-character",
  slug: "cave-dragon",
  title: "the dragon",
  world: "world/the-wandering-inn",
  firstChapter: 2,
  lastChapter: 2,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
