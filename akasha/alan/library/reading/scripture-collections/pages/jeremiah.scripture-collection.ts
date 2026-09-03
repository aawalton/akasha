import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const jeremiah = {
  id: "01a06808-34da-7006-bc42-319c077833e8",
  pageTypeSlug: "scripture-collection",
  slug: "jeremiah",
  title: "Jeremiah",
  partOfSlugs: ["old-testament"],
  position: 24,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "jeremiah",
} as const satisfies ScriptureCollection
