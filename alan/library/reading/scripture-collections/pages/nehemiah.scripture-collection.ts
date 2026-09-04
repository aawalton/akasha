import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const nehemiah = {
  id: "01a06808-34da-701c-9458-aa73c9057a1c",
  pageTypeSlug: "scripture-collection",
  slug: "nehemiah",
  title: "Nehemiah",
  partOfSlugs: ["old-testament"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "nehemiah",
} as const satisfies ScriptureCollection
