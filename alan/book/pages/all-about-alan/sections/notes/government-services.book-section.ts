import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const governmentServices = {
  id: "01a06594-c67a-7000-8c5e-a807d85056b0",
  type: "page-type/book-section",
  slug: "government-services",
  title: "Government services",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
