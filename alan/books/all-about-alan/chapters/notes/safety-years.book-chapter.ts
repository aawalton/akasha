import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const safetyYears = {
  id: "01a06594-c682-7001-85a0-d75c796d8c3b",
  pageTypeSlug: "book-chapter",
  slug: "safety-years",
  title: "Safety Years",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
