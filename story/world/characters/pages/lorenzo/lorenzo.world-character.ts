import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lorenzo = {
  id: "01a0b70b-8cc1-7e2f-80bd-0446241e27a8",
  type: "page-type/world-character",
  slug: "lorenzo",
  title: "Lorenzo",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 316,
} as const satisfies WorldCharacter
