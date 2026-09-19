import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const elmmet = {
  id: "01a0b70a-65e6-74cc-a7d8-7f5064dc56bd",
  type: "page-type/world-character",
  slug: "elmmet",
  title: "Master Elmmet",
  world: "world/the-wandering-inn",
  firstChapter: 351,
  lastChapter: 351,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
