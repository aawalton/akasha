import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gaoelos = {
  id: "01a0b70a-909a-76f5-80f6-1d4b225a854b",
  type: "page-type/world-character",
  slug: "gaoelos",
  title: "Captain Gaoelos",
  world: "world/the-wandering-inn",
  firstChapter: 600,
  lastChapter: 600,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
