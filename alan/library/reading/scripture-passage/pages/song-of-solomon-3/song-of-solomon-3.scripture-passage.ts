import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const songOfSolomon3 = {
  id: "01a06804-11b1-70c4-8d6c-ab47797cca6e",
  type: "page-type/scripture-passage",
  slug: "song-of-solomon-3",
  title: "Song of Solomon 3",
  partOfCollections: ["scripture-collection/song-of-solomon"],
  book: "Song of Solomon",
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "songofsolomon3",
} as const satisfies ScripturePassage
