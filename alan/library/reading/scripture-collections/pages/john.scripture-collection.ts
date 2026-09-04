import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const john = {
  id: "01a06808-34da-7009-a603-2c96fb8189e0",
  pageTypeSlug: "scripture-collection",
  slug: "john",
  title: "John",
  partOfSlugs: ["new-testament"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "john",
} as const satisfies ScriptureCollection
