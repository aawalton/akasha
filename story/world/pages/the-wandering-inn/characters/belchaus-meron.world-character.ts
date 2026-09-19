import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const belchausMeron = {
  id: "01a0b707-7f9b-793a-b027-68184f512671",
  type: "page-type/world-character",
  slug: "belchaus-meron",
  title: "Belchaus Meron",
  world: "world/the-wandering-inn",
  firstChapter: 503,
  lastChapter: 503,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
