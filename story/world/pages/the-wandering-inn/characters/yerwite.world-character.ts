import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const yerwite = {
  id: "01a0b70d-dcae-71c4-8926-4d95f804b86d",
  type: "page-type/world-character",
  slug: "yerwite",
  title: "Yerwite",
  world: "world/the-wandering-inn",
  firstChapter: 600,
  lastChapter: 600,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
