import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const demslethDragon = {
  id: "01a0b70a-1734-7412-9d81-ec342fc77664",
  type: "page-type/world-character",
  slug: "demsleth-dragon",
  title: "Demsleth",
  world: "world/the-wandering-inn",
  firstChapter: 715,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
