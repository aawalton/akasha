import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const handCompilationPipeline = {
  id: "01a06594-c684-700c-8743-ce74889caaf3",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "hand-compilation-pipeline",
  title: "Hand-compilation pipeline",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
