import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const trainingScaffold = {
  id: "01a06594-c684-700d-bdad-f1e251ece440",
  type: "book-section",
  slug: "training-scaffold",
  title: "Training scaffold",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: [
    "alan-book/all-about-alan",
    "book-section/all-about-alan/stateless-social-architecture",
  ],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
