import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const viecel = {
  id: "01a0b70d-93c8-7529-a168-62ff13fda01c",
  type: "page-type/world-character",
  slug: "viecel",
  title: "Viecel",
  world: "world/the-wandering-inn",
  firstChapter: 620,
  lastChapter: 620,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
