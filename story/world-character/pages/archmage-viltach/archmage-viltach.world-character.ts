import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const archmageViltach = {
  id: "01a0b707-7191-7491-a232-c7c86675da77",
  type: "page-type/world-character",
  slug: "archmage-viltach",
  title: "Archmage Viltach",
  world: "world/the-wandering-inn",
  firstChapter: 556,
  lastChapter: 556,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
