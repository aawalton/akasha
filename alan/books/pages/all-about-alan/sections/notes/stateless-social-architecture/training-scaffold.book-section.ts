import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const trainingScaffold = {
  id: "01a06594-c684-700d-bdad-f1e251ece440",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "training-scaffold",
  title: "Training scaffold",
  sectionOf: "all-about-alan",
  partOfCollections: [
    "all-about-alan",
    "book-section/all-about-alan/stateless-social-architecture",
  ],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
