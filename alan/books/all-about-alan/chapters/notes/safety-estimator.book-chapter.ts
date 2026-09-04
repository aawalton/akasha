import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const safetyEstimator = {
  id: "01a06594-c67f-7001-9c50-773055161c6a",
  pageTypeSlug: "book-chapter",
  slug: "safety-estimator",
  title: "The safety estimator",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
