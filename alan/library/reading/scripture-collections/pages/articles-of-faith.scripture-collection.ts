import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const articlesOfFaith = {
  id: "01a06808-34d9-7019-92bb-c8fb2e1bd4f1",
  pageTypeSlug: "scripture-collection",
  slug: "articles-of-faith",
  title: "Articles of Faith",
  partOfSlugs: ["pearl-of-great-price"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "articlesoffaith",
} as const satisfies ScriptureCollection
