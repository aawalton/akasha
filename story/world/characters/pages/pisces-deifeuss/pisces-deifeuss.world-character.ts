import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const piscesDeifeuss = {
  id: "01a0b70c-6fb8-7b16-9624-f2490840e93d",
  type: "page-type/world-character",
  slug: "pisces-deifeuss",
  title: "Pisces Deifeuss",
  world: "world/the-wandering-inn",
  firstChapter: 452,
  lastChapter: 452,
  characterClaims: "jsonl",
  aliasOf: "world-character/pisces-jealnet",
} as const satisfies WorldCharacter
