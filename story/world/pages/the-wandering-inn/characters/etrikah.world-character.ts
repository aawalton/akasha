import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const etrikah = {
  id: "01a0b70a-74ea-7806-a8a7-9046505fd0fa",
  type: "page-type/world-character",
  slug: "etrikah",
  title: "Etrikah",
  world: "world/the-wandering-inn",
  firstChapter: 554,
  lastChapter: 797,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
