import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const orjin = {
  id: "01a06580-2495-762b-8ec7-13ac83d2f761",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "orjin",
  title: "Orjin",
  world: "the-wandering-inn",
  maxLevel: 53,
  eventCount: 12,
  firstChapter: 636,
  lastChapter: 671,
} as const satisfies WorldCharacter
