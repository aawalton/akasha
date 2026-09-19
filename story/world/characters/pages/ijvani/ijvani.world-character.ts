import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ijvani = {
  id: "01a0b70b-0717-75c5-b22b-677d17efd904",
  type: "page-type/world-character",
  slug: "ijvani",
  title: "Ijvani",
  world: "world/the-wandering-inn",
  firstChapter: 148,
  lastChapter: 615,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
