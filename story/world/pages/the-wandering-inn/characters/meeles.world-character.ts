import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const meeles = {
  id: "01a0b70b-e41d-78ed-94ba-fd0bfa62cce0",
  type: "page-type/world-character",
  slug: "meeles",
  title: "Druid Meeles",
  world: "world/the-wandering-inn",
  firstChapter: 807,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
