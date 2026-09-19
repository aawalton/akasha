import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const osthiaBlackwing = {
  id: "01a0b70c-1e0a-73ab-a309-02e7d8e3da6f",
  type: "page-type/world-character",
  slug: "osthia-blackwing",
  title: "Osthia Blackwing",
  world: "world/the-wandering-inn",
  firstChapter: 193,
  lastChapter: 489,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
