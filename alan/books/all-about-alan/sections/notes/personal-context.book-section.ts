import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const personalContext = {
  id: "01a06594-c67c-7002-9a09-7ea028c3396e",
  pageTypeSlug: "book-section",
  slug: "personal-context",
  title: "Personal context",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
