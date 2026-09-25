import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const job = {
  id: "01a06808-34da-7007-a29d-0e21be3fc585",
  type: "page-type/scripture-collection",
  slug: "job",
  title: "Job",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 18,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "job",
} as const satisfies ScriptureCollection
