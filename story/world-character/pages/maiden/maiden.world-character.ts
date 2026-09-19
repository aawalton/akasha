import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const maiden = {
  id: "01a0b70b-9871-77e4-86e9-60c60a412855",
  type: "page-type/world-character",
  slug: "maiden",
  title: "The Maiden",
  world: "world/the-wandering-inn",
  firstChapter: 758,
  lastChapter: 758,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
