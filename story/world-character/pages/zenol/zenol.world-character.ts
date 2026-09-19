import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zenol = {
  id: "01a0b70d-ebcb-71f8-85e5-cc3b1ccdaa3f",
  type: "page-type/world-character",
  slug: "zenol",
  title: "Prince Zenol Isphel",
  world: "world/the-wandering-inn",
  firstChapter: 549,
  lastChapter: 796,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
