import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const circleOfThorns = {
  id: "01a0b70a-00b1-77e0-b444-b9e521722e36",
  type: "page-type/world-character",
  slug: "circle-of-thorns",
  title: "Circle of Thorns",
  world: "world/the-wandering-inn",
  firstChapter: 139,
  lastChapter: 139,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
