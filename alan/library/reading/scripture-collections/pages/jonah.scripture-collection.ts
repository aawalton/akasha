import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const jonah = {
  id: "01a06808-34da-700a-a8e4-bc02c51e7c36",
  pageTypeSlug: "scripture-collection",
  slug: "jonah",
  title: "Jonah",
  partOfSlugs: ["old-testament"],
  position: 32,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "jonah",
} as const satisfies ScriptureCollection
