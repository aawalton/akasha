import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const psalms = {
  id: "01a06808-34da-7027-80e9-dc53fe1226ed",
  type: "page-type/scripture-collection",
  slug: "psalms",
  title: "Psalms",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "psalms",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
