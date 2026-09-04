import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const psalms = {
  id: "01a06808-34da-7027-80e9-dc53fe1226ed",
  pageTypeSlug: "scripture-collection",
  slug: "psalms",
  title: "Psalms",
  partOfSlugs: ["old-testament"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "psalms",
} as const satisfies ScriptureCollection
