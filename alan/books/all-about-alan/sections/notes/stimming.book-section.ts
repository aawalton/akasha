import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const stimming = {
  id: "01a06594-c684-700f-9860-120a5f3d1449",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "stimming",
  title: "Stimming",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
