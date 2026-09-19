import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dameChorisa = {
  id: "01a0b70a-0f63-7e11-b51f-29a61173965a",
  type: "page-type/world-character",
  slug: "dame-chorisa",
  title: "Dame Chorisa",
  world: "world/the-wandering-inn",
  firstChapter: 533,
  lastChapter: 551,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
