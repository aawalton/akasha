import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const montressaDuValeross = {
  id: "01a06580-2495-75d1-97af-17066cf8f5e6",
  type: "page-type/world-character",
  slug: "montressa-du-valeross",
  title: "Montressa",
  world: "world/the-wandering-inn",
  maxLevel: 34,
  eventCount: 6,
  firstChapter: 375,
  lastChapter: 607,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
