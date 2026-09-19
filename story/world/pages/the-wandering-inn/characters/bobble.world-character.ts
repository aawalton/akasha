import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bobble = {
  id: "01a0b707-8816-72fc-8dfc-a5db1b916ef7",
  type: "page-type/world-character",
  slug: "bobble",
  title: "Bobble",
  world: "world/the-wandering-inn",
  firstChapter: 778,
  lastChapter: 778,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
