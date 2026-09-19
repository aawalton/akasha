import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const paige = {
  id: "01a0b70c-2012-77e2-96be-cef7ca4ab35a",
  type: "page-type/world-character",
  slug: "paige",
  title: "Paige",
  world: "world/the-wandering-inn",
  firstChapter: 315,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
