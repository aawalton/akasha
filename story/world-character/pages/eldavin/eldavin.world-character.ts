import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eldavin = {
  id: "01a06580-2494-7ddb-abe9-0b88773932df",
  type: "page-type/world-character",
  slug: "eldavin",
  title: "Grand Magus Eldavin",
  world: "world/the-wandering-inn",
  firstChapter: 452,
  lastChapter: 586,
  characterClaims: "jsonl",
  aliasOf: "world-character/teriarch",
} as const satisfies WorldCharacter
