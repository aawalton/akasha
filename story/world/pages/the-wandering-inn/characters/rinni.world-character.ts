import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rinni = {
  id: "01a0b70c-99c5-7837-bc43-25d905d228b4",
  type: "page-type/world-character",
  slug: "rinni",
  title: "Rinni",
  world: "world/the-wandering-inn",
  firstChapter: 780,
  lastChapter: 780,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
