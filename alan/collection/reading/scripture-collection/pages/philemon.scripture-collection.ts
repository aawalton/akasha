import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const philemon = {
  id: "01a06808-34da-7024-96fc-ff82f42e4155",
  type: "page-type/scripture-collection",
  slug: "philemon",
  title: "Philemon",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 18,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "philemon",
} as const satisfies ScriptureCollection
