import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const aldonss = {
  id: "01a0b707-6811-7e0c-a3d9-9c925e1fdf15",
  type: "page-type/world-character",
  slug: "aldonss",
  title: "Aldonss",
  world: "world/the-wandering-inn",
  firstChapter: 345,
  lastChapter: 345,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
