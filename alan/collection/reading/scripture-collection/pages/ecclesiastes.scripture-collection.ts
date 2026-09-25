import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const ecclesiastes = {
  id: "01a06808-34d9-701f-839a-802bb73ec407",
  type: "page-type/scripture-collection",
  slug: "ecclesiastes",
  title: "Ecclesiastes",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ecclesiastes",
} as const satisfies ScriptureCollection
