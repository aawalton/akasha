import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const siri = {
  id: "01a0b70d-035d-77ff-82ff-3b8ed1c07e16",
  type: "page-type/world-character",
  slug: "siri",
  title: "Siri",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
