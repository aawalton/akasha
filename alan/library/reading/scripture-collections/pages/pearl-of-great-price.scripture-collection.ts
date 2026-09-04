import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const pearlOfGreatPrice = {
  id: "01a06808-34da-7023-923a-4a221fdaa984",
  pageTypeSlug: "scripture-collection",
  slug: "pearl-of-great-price",
  title: "Pearl of Great Price",
  partOfSlugs: ["scriptures"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "pearlofgreatprice",
} as const satisfies ScriptureCollection
