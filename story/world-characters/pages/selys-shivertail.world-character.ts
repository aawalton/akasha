import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const selysShivertail = {
  id: "01a06580-2495-73e2-808c-aaae871e57e8",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "selys-shivertail",
  title: "Selys",
  world: "the-wandering-inn",
  maxLevel: 28,
  eventCount: 26,
  firstChapter: 258,
  lastChapter: 823,
} as const satisfies WorldCharacter
