import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const safetyWidget = {
  id: "01a06594-c682-7000-a69f-22f2bff3c930",
  type: "book-section",
  slug: "safety-widget",
  title: "The safety widget",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
