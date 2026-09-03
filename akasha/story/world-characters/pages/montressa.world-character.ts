import type { WorldCharacter } from "../world-character.page-type.ts"

export const montressa = {
  id: "01a06580-2495-75bc-ac0c-db554ccb1a62",
  pageTypeSlug: "world-character",
  slug: "montressa",
  title: "Montressa",
  worldSlug: "the-wandering-inn",
  maxLevel: 16,
  eventCount: 3,
  firstChapter: 640,
  lastChapter: 640,
} as const satisfies WorldCharacter
