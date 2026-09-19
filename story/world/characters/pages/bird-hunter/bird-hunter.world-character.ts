import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const birdHunter = {
  id: "01a0b707-8601-72bd-87fd-bfca028aafa3",
  type: "page-type/world-character",
  slug: "bird-hunter",
  title: "Bird",
  world: "world/the-wandering-inn",
  firstChapter: 434,
  lastChapter: 434,
  characterClaims: "jsonl",
  aliasOf: "world-character/bird",
} as const satisfies WorldCharacter
