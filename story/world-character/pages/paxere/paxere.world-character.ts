import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const paxere = {
  id: "01a0b70c-232b-7a8f-b000-64382fa66680",
  type: "page-type/world-character",
  slug: "paxere",
  title: "Paxere",
  world: "world/the-wandering-inn",
  firstChapter: 569,
  lastChapter: 698,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
