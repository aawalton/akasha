import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const conceptualCognition = {
  id: "01a06594-c676-7012-8f1d-87e941f558a4",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "conceptual-cognition",
  title: "Conceptual cognition",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
