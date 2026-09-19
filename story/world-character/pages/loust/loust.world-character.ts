import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const loust = {
  id: "01a0b70b-8d26-7021-9ce2-088a683dd0c1",
  type: "page-type/world-character",
  slug: "loust",
  title: "Loust",
  world: "world/the-wandering-inn",
  firstChapter: 695,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
