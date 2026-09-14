import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const insurance = {
  id: "01a06594-c67a-7011-b244-b64b22cf1bec",
  type: "book-section",
  slug: "insurance",
  title: "Insurance",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
