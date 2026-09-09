import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const missingSimulator = {
  id: "01a06594-c67b-7007-9310-87e51b6a6de1",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "missing-simulator",
  title: "The missing simulator",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
