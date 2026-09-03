import type { FandomCollection } from "../fandom-collection.page-type.ts"

export const scienceFictionFandoms = {
  id: "01a06808-5f7f-7003-93c0-833cfcfd5eb0",
  pageTypeSlug: "fandom-collection",
  slug: "science-fiction-fandoms",
  title: "Science Fiction Fandoms",
  partOfSlugs: ["fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies FandomCollection
