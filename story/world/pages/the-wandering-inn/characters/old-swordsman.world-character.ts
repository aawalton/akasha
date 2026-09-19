import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const oldSwordsman = {
  id: "01a0b70c-1620-79fb-921e-f9d248f8382b",
  type: "page-type/world-character",
  slug: "old-swordsman",
  title: "an old swordsman",
  world: "world/the-wandering-inn",
  firstChapter: 12,
  lastChapter: 12,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
