import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lemocles = {
  id: "01a0b70b-80c2-7223-9369-a787a8149682",
  type: "page-type/world-character",
  slug: "lemocles",
  title: "Lemocles",
  world: "world/the-wandering-inn",
  firstChapter: 636,
  lastChapter: 636,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
