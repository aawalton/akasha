import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const claudeil = {
  id: "01a0b70a-0361-7d4c-a0a0-af7eda203b9d",
  type: "page-type/world-character",
  slug: "claudeil",
  title: "Claudeil",
  world: "world/the-wandering-inn",
  firstChapter: 30,
  lastChapter: 58,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
