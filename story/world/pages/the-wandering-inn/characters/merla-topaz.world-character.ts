import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const merlaTopaz = {
  id: "01a0b70b-e9a0-7f2c-a6f7-f3143e47bfae",
  type: "page-type/world-character",
  slug: "merla-topaz",
  title: "Merla Topaz",
  world: "world/the-wandering-inn",
  firstChapter: 489,
  lastChapter: 489,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
