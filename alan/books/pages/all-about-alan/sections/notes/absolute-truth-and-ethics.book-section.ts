import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const absoluteTruthAndEthics = {
  id: "01a06594-c674-7003-8597-1bf55d555487",
  type: "book-section",
  slug: "absolute-truth-and-ethics",
  title: "Absolute truth and ethics",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
