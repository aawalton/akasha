import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const redemption = {
  id: "01a0b70c-893b-7ca3-b4dc-2204aa3909fe",
  type: "page-type/world-character",
  slug: "redemption",
  title: "Redemption",
  world: "world/the-wandering-inn",
  firstChapter: 618,
  lastChapter: 618,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
