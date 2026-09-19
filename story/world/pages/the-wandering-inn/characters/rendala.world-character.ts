import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rendala = {
  id: "01a0b70c-9051-7761-90e6-52fb2f46db69",
  type: "page-type/world-character",
  slug: "rendala",
  title: "Rendala",
  world: "world/the-wandering-inn",
  firstChapter: 239,
  lastChapter: 239,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
