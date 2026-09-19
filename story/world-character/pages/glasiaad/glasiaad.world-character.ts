import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const glasiaad = {
  id: "01a0b70a-9f17-7239-b62c-35b400b57dc7",
  type: "page-type/world-character",
  slug: "glasiaad",
  title: "Glasiaad",
  world: "world/the-wandering-inn",
  firstChapter: 794,
  lastChapter: 794,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
