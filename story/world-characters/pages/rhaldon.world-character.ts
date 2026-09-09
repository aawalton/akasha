import type { WorldCharacter } from "../world-character.page-type.ts"

export const rhaldon = {
  id: "01a06580-2495-708e-9dd0-ef2db53b50a5",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "rhaldon",
  title: "Rhaldon",
  world: "the-wandering-inn",
  maxLevel: 15,
  eventCount: 20,
  firstChapter: 665,
  lastChapter: 665,
} as const satisfies WorldCharacter
