import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const doctrineAndCovenants = {
  id: "01a06808-34d9-701e-9ee4-67982860a898",
  pageTypeSlug: "scripture-collection",
  slug: "doctrine-and-covenants",
  title: "Doctrine and Covenants",
  partOfSlugs: ["scriptures"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "doctrineandcovenants",
} as const satisfies ScriptureCollection
