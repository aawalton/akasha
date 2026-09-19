import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const anand = {
  id: "01a0b707-6daf-7eeb-a77e-44d09ab287bb",
  type: "page-type/world-character",
  slug: "anand",
  title: "Anand",
  world: "world/the-wandering-inn",
  firstChapter: 147,
  lastChapter: 688,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
