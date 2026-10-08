import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const pearlOfGreatPrice = {
  id: "01a06808-34da-7023-923a-4a221fdaa984",
  type: "page-type/scripture-collection",
  slug: "pearl-of-great-price",
  title: "Pearl of Great Price",
  partOfCollections: ["scripture-collection/scriptures"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "pearlofgreatprice",
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
