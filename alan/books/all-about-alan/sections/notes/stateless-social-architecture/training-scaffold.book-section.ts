import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const trainingScaffold = {
  id: "01a06594-c684-700d-bdad-f1e251ece440",
  pageTypeSlug: "book-section",
  slug: "training-scaffold",
  title: "Training scaffold",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
