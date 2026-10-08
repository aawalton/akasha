import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const proverbs = {
  id: "01a06808-34da-7026-847e-ce6b4f79188e",
  type: "page-type/scripture-collection",
  slug: "proverbs",
  title: "Proverbs",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "proverbs",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
