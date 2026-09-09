import type { WorldCharacter } from "../world-character.page-type.ts"

export const nailren = {
  id: "01a06580-2495-78e2-ac4f-3e62948e6605",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "nailren",
  title: "Nailren",
  world: "the-wandering-inn",
  maxLevel: 33,
  eventCount: 11,
  firstChapter: 637,
  lastChapter: 816,
} as const satisfies WorldCharacter
