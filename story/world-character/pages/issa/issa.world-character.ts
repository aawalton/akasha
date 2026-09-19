import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const issa = {
  id: "01a0b70b-153f-7df9-9de2-bbbca30a69b0",
  type: "page-type/world-character",
  slug: "issa",
  title: "Issa",
  world: "world/the-wandering-inn",
  firstChapter: 391,
  lastChapter: 391,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
