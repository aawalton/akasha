import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const drakeGuardEastGate = {
  id: "01a0b70a-1ca5-79f1-b28e-90d45ffd6148",
  type: "page-type/world-character",
  slug: "drake-guard-east-gate",
  title: "the Drake guard at the eastern gates",
  world: "world/the-wandering-inn",
  firstChapter: 13,
  lastChapter: 13,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
