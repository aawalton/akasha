import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const measurementMaturity = {
  id: "01a06594-c67b-7004-a6ee-e884c28ae200",
  type: "book-section",
  slug: "measurement-maturity",
  title: "Measurement maturity",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
