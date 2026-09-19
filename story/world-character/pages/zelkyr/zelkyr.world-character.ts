import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zelkyr = {
  id: "01a0b70d-eadb-78c6-9159-9f93cb06aa62",
  type: "page-type/world-character",
  slug: "zelkyr",
  title: "Zelkyr Amerwing",
  world: "world/the-wandering-inn",
  firstChapter: 502,
  lastChapter: 502,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
