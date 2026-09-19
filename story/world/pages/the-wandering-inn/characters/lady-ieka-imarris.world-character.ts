import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyIekaImarris = {
  id: "01a0b70b-73d5-7988-bd03-f3d1fce2dd40",
  type: "page-type/world-character",
  slug: "lady-ieka-imarris",
  title: "Lady Ieka Imarris",
  world: "world/the-wandering-inn",
  firstChapter: 416,
  lastChapter: 449,
  characterClaims: "jsonl",
  aliasOf: "world-character/ieka-imarris",
} as const satisfies WorldCharacter
