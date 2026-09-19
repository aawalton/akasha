import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const halrac = {
  id: "01a0b706-d66d-77a1-93d5-aa3ffe847691",
  type: "page-type/world-character",
  slug: "halrac",
  title: "Halrac",
  world: "world/the-wandering-inn",
  firstChapter: 94,
  lastChapter: 758,
  characterClaims: "jsonl",
  aliasOf: "world-character/halrac-everam",
} as const satisfies WorldCharacter
