import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dasha = {
  id: "01a0b70a-134f-76f4-93a9-3ccc3ab03fc1",
  type: "page-type/world-character",
  slug: "dasha",
  title: "Dasha",
  world: "world/the-wandering-inn",
  firstChapter: 185,
  lastChapter: 245,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
