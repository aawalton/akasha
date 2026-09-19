import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const falamizural = {
  id: "01a0b70a-79ba-7f9e-ab80-2418a591ba73",
  type: "page-type/world-character",
  slug: "falamizural",
  title: "the Garuda",
  world: "world/the-wandering-inn",
  firstChapter: 711,
  lastChapter: 770,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
