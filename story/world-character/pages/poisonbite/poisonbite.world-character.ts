import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const poisonbite = {
  id: "01a0b70c-71bd-72a7-9c72-7c2c38f3609f",
  type: "page-type/world-character",
  slug: "poisonbite",
  title: "Poisonbite",
  world: "world/the-wandering-inn",
  firstChapter: 157,
  lastChapter: 729,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
