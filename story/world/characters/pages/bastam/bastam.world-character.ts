import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bastam = {
  id: "01a0b707-7bca-7b42-bb61-797227f527c2",
  type: "page-type/world-character",
  slug: "bastam",
  title: "Bastam",
  world: "world/the-wandering-inn",
  firstChapter: 162,
  lastChapter: 164,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
