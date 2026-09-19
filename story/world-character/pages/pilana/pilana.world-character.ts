import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pilana = {
  id: "01a0b70c-6d33-786e-8ebe-a058451576d0",
  type: "page-type/world-character",
  slug: "pilana",
  title: "Pilana",
  world: "world/the-wandering-inn",
  firstChapter: 823,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
