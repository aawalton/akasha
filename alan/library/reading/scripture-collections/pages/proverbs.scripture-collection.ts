import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const proverbs = {
  id: "01a06808-34da-7026-847e-ce6b4f79188e",
  pageTypeSlug: "scripture-collection",
  slug: "proverbs",
  title: "Proverbs",
  partOfSlugs: ["old-testament"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "proverbs",
} as const satisfies ScriptureCollection
