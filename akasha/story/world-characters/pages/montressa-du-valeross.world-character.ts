import type { WorldCharacter } from "../world-character.page-type.ts"

export const montressaDuValeross = {
  id: "01a06580-2495-75d1-97af-17066cf8f5e6",
  pageTypeSlug: "world-character",
  slug: "montressa-du-valeross",
  title: "Montressa",
  worldSlug: "the-wandering-inn",
  maxLevel: 34,
  eventCount: 6,
  firstChapter: 545,
  lastChapter: 607,
} as const satisfies WorldCharacter
