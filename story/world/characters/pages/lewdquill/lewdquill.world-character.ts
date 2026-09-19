import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lewdquill = {
  id: "01a0b70b-83d6-7ad0-b365-6e61fee0e465",
  type: "page-type/world-character",
  slug: "lewdquill",
  title: "Lewdquill",
  world: "world/the-wandering-inn",
  firstChapter: 804,
  lastChapter: 804,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
