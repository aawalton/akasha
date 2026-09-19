import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lehra = {
  id: "01a0b70b-7f74-7d14-b803-b48938959fc4",
  type: "page-type/world-character",
  slug: "lehra",
  title: "Lehra",
  world: "world/the-wandering-inn",
  firstChapter: 535,
  lastChapter: 614,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
