import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const yimur = {
  id: "01a0b70d-dce9-712b-9d01-cca74e069ca7",
  type: "page-type/world-character",
  slug: "yimur",
  title: "Yimur",
  world: "world/the-wandering-inn",
  firstChapter: 382,
  lastChapter: 382,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
