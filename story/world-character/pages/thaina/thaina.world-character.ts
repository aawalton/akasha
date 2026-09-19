import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const thaina = {
  id: "01a0b70d-1b08-7315-b34a-10d55c1db510",
  type: "page-type/world-character",
  slug: "thaina",
  title: "Thaina",
  world: "world/the-wandering-inn",
  firstChapter: 458,
  lastChapter: 458,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
