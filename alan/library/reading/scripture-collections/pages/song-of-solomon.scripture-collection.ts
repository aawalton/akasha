import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const songOfSolomon = {
  id: "01a06808-34da-702d-9739-0ef9667000b2",
  type: "scripture-collection",
  slug: "song-of-solomon",
  title: "Song of Solomon",
  partOfCollections: ["old-testament"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "songofsolomon",
} as const satisfies ScriptureCollection
