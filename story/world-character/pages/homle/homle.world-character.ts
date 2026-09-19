import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const homle = {
  id: "01a0b70a-ff64-730c-a4b6-6edc6a7cb58c",
  type: "page-type/world-character",
  slug: "homle",
  title: "Homle",
  world: "world/the-wandering-inn",
  firstChapter: 692,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
