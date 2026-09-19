import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const calithe = {
  id: "01a0b707-8fea-72ab-ba85-084247b08d5f",
  type: "page-type/world-character",
  slug: "calithe",
  title: "Calithe",
  world: "world/the-wandering-inn",
  firstChapter: 733,
  lastChapter: 733,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
