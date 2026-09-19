import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const greybeard = {
  id: "01a0b70a-ea7e-7bac-a000-ed956c5047b3",
  type: "page-type/world-character",
  slug: "greybeard",
  title: "the old Goblin",
  world: "world/the-wandering-inn",
  firstChapter: 155,
  lastChapter: 232,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
