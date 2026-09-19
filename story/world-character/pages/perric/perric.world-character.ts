import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const perric = {
  id: "01a0b70c-2969-72a1-b7b1-1e5b1e0fbe4e",
  type: "page-type/world-character",
  slug: "perric",
  title: "High King Perric",
  world: "world/the-wandering-inn",
  firstChapter: 454,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
