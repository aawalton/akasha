import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eska = {
  id: "01a0b70a-740d-755b-9d7d-fc98fd9c3d48",
  type: "page-type/world-character",
  slug: "eska",
  title: "Eska",
  world: "world/the-wandering-inn",
  firstChapter: 470,
  lastChapter: 470,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
