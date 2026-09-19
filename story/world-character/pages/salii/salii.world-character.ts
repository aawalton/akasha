import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const salii = {
  id: "01a0b70c-a924-73a3-8a38-c01207127e83",
  type: "page-type/world-character",
  slug: "salii",
  title: "Salii",
  world: "world/the-wandering-inn",
  firstChapter: 326,
  lastChapter: 671,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
