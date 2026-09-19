import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const priya = {
  id: "01a0b70c-75e3-742c-b961-037c656fbd18",
  type: "page-type/world-character",
  slug: "priya",
  title: "Priya",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
