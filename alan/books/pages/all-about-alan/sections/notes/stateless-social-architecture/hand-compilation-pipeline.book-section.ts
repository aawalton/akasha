import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const handCompilationPipeline = {
  id: "01a06594-c684-700c-8743-ce74889caaf3",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "hand-compilation-pipeline",
  title: "Hand-compilation pipeline",
  sectionOf: "all-about-alan",
  partOfCollections: [
    "all-about-alan",
    "book-section/all-about-alan/stateless-social-architecture",
  ],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
