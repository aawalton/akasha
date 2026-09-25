import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const hosea = {
  id: "01a06808-34da-7001-9b34-4fe545007f13",
  type: "page-type/scripture-collection",
  slug: "hosea",
  title: "Hosea",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 28,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "hosea",
} as const satisfies ScriptureCollection
