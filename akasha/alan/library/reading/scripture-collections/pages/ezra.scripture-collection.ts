import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const ezra = {
  id: "01a06808-34d9-7026-beff-5561d6fe8d62",
  pageTypeSlug: "scripture-collection",
  slug: "ezra",
  title: "Ezra",
  partOfSlugs: ["old-testament"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "ezra",
} as const satisfies ScriptureCollection
