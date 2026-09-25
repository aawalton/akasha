import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const zechariah = {
  id: "01a06808-34da-7030-a319-b104928bba36",
  type: "page-type/scripture-collection",
  slug: "zechariah",
  title: "Zechariah",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 38,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "zechariah",
} as const satisfies ScriptureCollection
