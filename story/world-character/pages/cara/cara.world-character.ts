import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cara = {
  id: "01a0b707-94fd-71c7-9398-df1bf2d8cca8",
  type: "page-type/world-character",
  slug: "cara",
  title: "Cara",
  world: "world/the-wandering-inn",
  firstChapter: 458,
  lastChapter: 667,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
