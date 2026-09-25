import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const malachi = {
  id: "01a06808-34da-7013-963c-1a8ed20a325e",
  type: "page-type/scripture-collection",
  slug: "malachi",
  title: "Malachi",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 39,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "malachi",
} as const satisfies ScriptureCollection
