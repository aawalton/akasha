import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const twinGirl = {
  id: "01a0b70d-76bf-7b49-932a-42de07b03e5b",
  type: "page-type/world-character",
  slug: "twin-girl",
  title: "a girl of sixteen",
  world: "world/the-wandering-inn",
  firstChapter: 27,
  lastChapter: 27,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
