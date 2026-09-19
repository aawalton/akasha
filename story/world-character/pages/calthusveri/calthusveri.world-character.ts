import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const calthusveri = {
  id: "01a0b707-90bc-754c-b0bd-f512f413ba48",
  type: "page-type/world-character",
  slug: "calthusveri",
  title: "Calthusveri",
  world: "world/the-wandering-inn",
  firstChapter: 536,
  lastChapter: 536,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
