import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wanderer = {
  id: "01a0b70d-9912-715f-ad06-5286f94d2343",
  type: "page-type/world-character",
  slug: "wanderer",
  title: "Wanderer",
  world: "world/the-wandering-inn",
  firstChapter: 516,
  lastChapter: 530,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
