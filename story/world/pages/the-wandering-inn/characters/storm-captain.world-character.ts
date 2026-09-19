import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const stormCaptain = {
  id: "01a0b70d-0f1d-76cc-bb31-27ae0cd4d1c0",
  type: "page-type/world-character",
  slug: "storm-captain",
  title: "the pirate captain",
  world: "world/the-wandering-inn",
  firstChapter: 162,
  lastChapter: 162,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
