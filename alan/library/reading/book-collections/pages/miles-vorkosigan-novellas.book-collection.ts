import type { BookCollection } from "../book-collection.page-type.ts"

export const milesVorkosiganNovellas = {
  id: "01a06808-148f-7003-baf4-75d79e4989d8",
  pageTypeSlug: "book-collection",
  slug: "miles-vorkosigan-novellas",
  title: "Miles Vorkosigan Novellas",
  partOfSlugs: ["lois-mcmaster-bujold"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
