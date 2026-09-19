import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const shaunaSolstice = {
  id: "01a0b70c-fbf5-7d20-901f-3398ba59b52b",
  type: "page-type/world-character",
  slug: "shauna-solstice",
  title: "Shauna Solstice",
  world: "world/the-wandering-inn",
  firstChapter: 495,
  lastChapter: 495,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
