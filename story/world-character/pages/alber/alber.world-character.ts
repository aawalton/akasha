import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const alber = {
  id: "01a0b707-6715-77c4-ae8a-645e3217f924",
  type: "page-type/world-character",
  slug: "alber",
  title: "Alber",
  world: "world/the-wandering-inn",
  firstChapter: 311,
  lastChapter: 640,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
