import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theEnforcer = {
  id: "01a0b70d-1ca5-7288-ae40-b854d86378b5",
  type: "page-type/world-character",
  slug: "the-enforcer",
  title: "The Enforcer",
  world: "world/the-wandering-inn",
  firstChapter: 348,
  lastChapter: 348,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
