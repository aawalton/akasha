import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theFearlessDemon = {
  id: "01a0b70d-1ce2-7475-a167-739972177a32",
  type: "page-type/world-character",
  slug: "the-fearless-demon",
  title: "the captive Fearless",
  world: "world/the-wandering-inn",
  firstChapter: 215,
  lastChapter: 215,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
