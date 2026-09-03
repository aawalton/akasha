import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const songOfSolomon = {
  id: "01a06808-34da-702d-9739-0ef9667000b2",
  pageTypeSlug: "scripture-collection",
  slug: "song-of-solomon",
  title: "Song of Solomon",
  partOfSlugs: ["old-testament"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "songofsolomon",
} as const satisfies ScriptureCollection
