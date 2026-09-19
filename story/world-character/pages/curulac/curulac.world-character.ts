import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const curulac = {
  id: "01a0b70a-0cde-7ec1-b652-6935c17dfad9",
  type: "page-type/world-character",
  slug: "curulac",
  title: "Curulac",
  world: "world/the-wandering-inn",
  firstChapter: 157,
  lastChapter: 157,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
