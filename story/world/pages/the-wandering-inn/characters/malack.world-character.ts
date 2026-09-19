import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const malack = {
  id: "01a0b70b-998c-7106-8755-6fe7497dadf1",
  type: "page-type/world-character",
  slug: "malack",
  title: "Malack",
  world: "world/the-wandering-inn",
  firstChapter: 785,
  lastChapter: 785,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
