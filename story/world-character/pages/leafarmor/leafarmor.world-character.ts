import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const leafarmor = {
  id: "01a0b70b-7ece-7b1c-b811-d9044be0ffc9",
  type: "page-type/world-character",
  slug: "leafarmor",
  title: "Leafarmor",
  world: "world/the-wandering-inn",
  firstChapter: 395,
  lastChapter: 395,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
