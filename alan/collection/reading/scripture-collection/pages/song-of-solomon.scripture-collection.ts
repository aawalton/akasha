import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const songOfSolomon = {
  id: "01a06808-34da-702d-9739-0ef9667000b2",
  type: "page-type/scripture-collection",
  slug: "song-of-solomon",
  title: "Song of Solomon",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "songofsolomon",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
