import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const frostwing = {
  id: "01a0b70a-8dc6-70ce-933a-61bd935751df",
  type: "page-type/world-character",
  slug: "frostwing",
  title: "Frostwing",
  world: "world/the-wandering-inn",
  firstChapter: 173,
  lastChapter: 204,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
