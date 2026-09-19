import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const headmanFilk = {
  id: "01a0b70a-f41b-7637-af12-fe66d6dba475",
  type: "page-type/world-character",
  slug: "headman-filk",
  title: "Filk",
  world: "world/the-wandering-inn",
  firstChapter: 250,
  lastChapter: 250,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
