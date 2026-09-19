import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wiskeria = {
  id: "01a0b70d-9f48-7e45-b81d-c79acb849385",
  type: "page-type/world-character",
  slug: "wiskeria",
  title: "Wiskeria",
  world: "world/the-wandering-inn",
  firstChapter: 202,
  lastChapter: 611,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
