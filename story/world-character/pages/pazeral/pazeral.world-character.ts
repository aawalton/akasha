import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pazeral = {
  id: "01a0b70c-2364-7c71-b62c-51619d210027",
  type: "page-type/world-character",
  slug: "pazeral",
  title: "Pazeral",
  world: "world/the-wandering-inn",
  firstChapter: 676,
  lastChapter: 676,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
