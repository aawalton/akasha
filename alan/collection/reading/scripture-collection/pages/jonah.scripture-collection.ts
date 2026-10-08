import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const jonah = {
  id: "01a06808-34da-700a-a8e4-bc02c51e7c36",
  type: "page-type/scripture-collection",
  slug: "jonah",
  title: "Jonah",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 32,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "jonah",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
