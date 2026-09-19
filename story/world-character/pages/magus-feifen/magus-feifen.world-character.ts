import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const magusFeifen = {
  id: "01a0b70b-9837-7a5e-9dbd-a5705c57aaf4",
  type: "page-type/world-character",
  slug: "magus-feifen",
  title: "Feifen",
  world: "world/the-wandering-inn",
  firstChapter: 646,
  lastChapter: 646,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
