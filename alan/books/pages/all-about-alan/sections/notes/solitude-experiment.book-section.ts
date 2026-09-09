import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const solitudeExperiment = {
  id: "01a06594-c684-7008-9cea-75880e1a86f6",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "solitude-experiment",
  title: "The solitude experiment",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
