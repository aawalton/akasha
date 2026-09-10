import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const ryoka = {
  id: "01a06580-2495-7e14-bf66-b3078bde8b83",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "ryoka",
  title: "Ryoka",
  world: "the-wandering-inn",
  maxLevel: 3,
  eventCount: 2,
  firstChapter: 114,
  lastChapter: 114,
} as const satisfies WorldCharacter
