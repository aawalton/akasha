import type { WorldCharacter } from "../world-character.page-type.ts"

export const minotaurEmissary = {
  id: "01a06580-2495-7f9e-b299-d35f46bab375",
  pageTypeSlug: "world-character",
  slug: "minotaur-emissary",
  title: "the Minotaur",
  worldSlug: "the-wandering-inn",
  maxLevel: 37,
  eventCount: 2,
  firstChapter: 506,
  lastChapter: 506,
} as const satisfies WorldCharacter
