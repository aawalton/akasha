import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const scriptureCollection1Samuel = {
  id: "01a06808-34d9-7006-a8dd-ed9857b8bdd3",
  pageTypeSlug: "scripture-collection",
  slug: "scripture-collection-1-samuel",
  title: "1 Samuel",
  partOfSlugs: ["old-testament"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "1samuel",
} as const satisfies ScriptureCollection
