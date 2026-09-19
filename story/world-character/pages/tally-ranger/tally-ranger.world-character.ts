import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tallyRanger = {
  id: "01a0b70d-1301-7611-b419-3dbfb21a712c",
  type: "page-type/world-character",
  slug: "tally-ranger",
  title: "Tally",
  world: "world/the-wandering-inn",
  firstChapter: 337,
  lastChapter: 337,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
