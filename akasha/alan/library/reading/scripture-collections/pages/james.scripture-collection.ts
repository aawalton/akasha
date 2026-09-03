import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const james = {
  id: "01a06808-34da-7004-a9a8-5253de1ead2e",
  pageTypeSlug: "scripture-collection",
  slug: "james",
  title: "James",
  partOfSlugs: ["new-testament"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "james",
} as const satisfies ScriptureCollection
