import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bugear = {
  id: "01a0b707-8acb-7393-badf-16bcc1f8f819",
  type: "page-type/world-character",
  slug: "bugear",
  title: "Bugear",
  world: "world/the-wandering-inn",
  firstChapter: 146,
  lastChapter: 220,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
