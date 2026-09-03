import type { WorldCharacter } from "../world-character.page-type.ts"

export const admiralDakelos = {
  id: "01a06580-2493-754d-aa3d-c53cb24be1e6",
  pageTypeSlug: "world-character",
  slug: "admiral-dakelos",
  title: "Admiral Dakelos",
  worldSlug: "the-wandering-inn",
  maxLevel: 40,
  eventCount: 7,
  firstChapter: 646,
  lastChapter: 646,
} as const satisfies WorldCharacter
