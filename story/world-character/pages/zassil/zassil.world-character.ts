import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zassil = {
  id: "01a0b70d-e8cb-7cda-811d-146172901db1",
  type: "page-type/world-character",
  slug: "zassil",
  title: "Zassil",
  world: "world/the-wandering-inn",
  firstChapter: 391,
  lastChapter: 391,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
