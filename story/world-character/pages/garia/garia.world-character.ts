import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const garia = {
  id: "01a0b70a-9178-72d2-bc4c-19ea540ed90a",
  type: "page-type/world-character",
  slug: "garia",
  title: "Garia",
  world: "world/the-wandering-inn",
  firstChapter: 36,
  lastChapter: 352,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
