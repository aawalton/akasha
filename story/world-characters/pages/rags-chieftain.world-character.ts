import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const ragsChieftain = {
  id: "01a06580-2495-743b-8f6d-ca2a50e6047c",
  type: "world-character",
  slug: "rags-chieftain",
  title: "Rags",
  world: "the-wandering-inn",
  maxLevel: 45,
  eventCount: 9,
  firstChapter: 764,
  lastChapter: 764,
} as const satisfies WorldCharacter
