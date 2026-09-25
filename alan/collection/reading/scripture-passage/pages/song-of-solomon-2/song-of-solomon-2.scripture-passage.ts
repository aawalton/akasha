import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const songOfSolomon2 = {
  id: "01a06804-11b1-70c3-afaf-5e08c9aa1caf",
  type: "page-type/scripture-passage",
  slug: "song-of-solomon-2",
  title: "Song of Solomon 2",
  partOfCollections: ["scripture-collection/song-of-solomon"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "songofsolomon2",
} as const satisfies ScripturePassage
