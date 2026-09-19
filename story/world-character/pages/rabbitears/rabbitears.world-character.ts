import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rabbitears = {
  id: "01a0b70c-7d50-7383-8e03-50004b9be1cb",
  type: "page-type/world-character",
  slug: "rabbitears",
  title: "Rabbitears",
  world: "world/the-wandering-inn",
  firstChapter: 266,
  lastChapter: 266,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
