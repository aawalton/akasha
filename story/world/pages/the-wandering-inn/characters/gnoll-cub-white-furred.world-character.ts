import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gnollCubWhiteFurred = {
  id: "01a0b70a-a032-7a34-8fab-5bace2adec8d",
  type: "page-type/world-character",
  slug: "gnoll-cub-white-furred",
  title: "Gnoll cub",
  world: "world/the-wandering-inn",
  firstChapter: 111,
  lastChapter: 111,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
