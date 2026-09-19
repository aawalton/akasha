import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ulcreziek = {
  id: "01a0b70d-7ba1-78ad-98ec-422513b441d2",
  type: "page-type/world-character",
  slug: "ulcreziek",
  title: "Ulcreziek",
  world: "world/the-wandering-inn",
  firstChapter: 584,
  lastChapter: 584,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
