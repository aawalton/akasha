import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const computers = {
  id: "01a06594-c68d-7004-b389-d504ed1464d2",
  pageTypeSlug: "book-chapter",
  slug: "computers",
  title: "12 Gaming Computers",
  description:
    "12 high-end gaming PCs — per-system TDP breakdown, moderate vs heavy usage scenarios, annual kWh range, peak coincident draw, year-round flat profile.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
