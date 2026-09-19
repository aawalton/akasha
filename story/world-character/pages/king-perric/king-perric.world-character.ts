import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kingPerric = {
  id: "01a0b70b-6c51-7eaa-9a3d-78f429810b42",
  type: "page-type/world-character",
  slug: "king-perric",
  title: "Perric",
  world: "world/the-wandering-inn",
  firstChapter: 712,
  lastChapter: 712,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
