import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hetarria = {
  id: "01a0b70a-fa23-742f-b295-079b91fa4460",
  type: "page-type/world-character",
  slug: "hetarria",
  title: "Hetarria",
  world: "world/the-wandering-inn",
  firstChapter: 439,
  lastChapter: 439,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
