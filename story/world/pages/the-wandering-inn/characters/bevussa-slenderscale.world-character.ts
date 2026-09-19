import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bevussaSlenderscale = {
  id: "01a0b707-83d0-7bd3-a94d-1a5b4d258d02",
  type: "page-type/world-character",
  slug: "bevussa-slenderscale",
  title: "Bevussa Slenderscale",
  world: "world/the-wandering-inn",
  firstChapter: 278,
  lastChapter: 373,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
