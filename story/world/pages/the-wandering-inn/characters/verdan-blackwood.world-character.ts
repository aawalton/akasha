import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const verdanBlackwood = {
  id: "01a0b70d-8ebd-73b8-ae6f-d98dd02712fb",
  type: "page-type/world-character",
  slug: "verdan-blackwood",
  title: "Verdan Blackwood",
  world: "world/the-wandering-inn",
  firstChapter: 686,
  lastChapter: 686,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
