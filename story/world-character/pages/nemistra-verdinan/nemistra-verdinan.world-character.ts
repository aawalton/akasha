import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nemistraVerdinan = {
  id: "01a0b70c-04b8-79aa-b9f9-7ebbc691f630",
  type: "page-type/world-character",
  slug: "nemistra-verdinan",
  title: "Nemistra Verdinan",
  world: "world/the-wandering-inn",
  firstChapter: 160,
  lastChapter: 160,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
