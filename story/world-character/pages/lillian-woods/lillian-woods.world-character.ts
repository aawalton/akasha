import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lillianWoods = {
  id: "01a0b70b-84b5-705e-b006-e47a98160fcc",
  type: "page-type/world-character",
  slug: "lillian-woods",
  title: "Lillian Woods",
  world: "world/the-wandering-inn",
  firstChapter: 422,
  lastChapter: 422,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
