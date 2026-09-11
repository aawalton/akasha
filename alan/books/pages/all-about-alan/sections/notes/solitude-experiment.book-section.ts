import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const solitudeExperiment = {
  id: "01a06594-c684-7008-9cea-75880e1a86f6",
  type: "book-section",
  slug: "solitude-experiment",
  title: "The solitude experiment",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
