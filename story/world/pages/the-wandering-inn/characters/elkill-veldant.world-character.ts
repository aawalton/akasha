import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const elkillVeldant = {
  id: "01a0b70a-657a-727d-8175-84abd26eb848",
  type: "page-type/world-character",
  slug: "elkill-veldant",
  title: "Elkill",
  world: "world/the-wandering-inn",
  firstChapter: 366,
  lastChapter: 366,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
