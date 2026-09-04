import type { WorldCharacter } from "../world-character.page-type.ts"

export const ragsChieftain = {
  id: "01a06580-2495-743b-8f6d-ca2a50e6047c",
  pageTypeSlug: "world-character",
  slug: "rags-chieftain",
  title: "Rags",
  worldSlug: "the-wandering-inn",
  maxLevel: 45,
  eventCount: 9,
  firstChapter: 764,
  lastChapter: 764,
} as const satisfies WorldCharacter
