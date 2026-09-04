import type { BookCollection } from "../book-collection.page-type.ts"

export const teachingsOfJosephFieldingSmith = {
  id: "01a06808-148f-7015-9895-a12daee963db",
  pageTypeSlug: "book-collection",
  slug: "teachings-of-joseph-fielding-smith",
  title: "Teachings of Joseph Fielding Smith",
  partOfSlugs: ["joseph-fielding-smith"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
