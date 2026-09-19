import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const daly = {
  id: "01a0b70a-0ebd-7bbc-813c-7594a1a8426d",
  type: "page-type/world-character",
  slug: "daly",
  title: "Daly",
  world: "world/the-wandering-inn",
  firstChapter: 197,
  lastChapter: 695,
  characterClaims: "jsonl",
  aliasOf: "world-character/daly-sullivan",
} as const satisfies WorldCharacter
