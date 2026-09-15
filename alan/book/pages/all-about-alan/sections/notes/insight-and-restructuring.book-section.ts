import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const insightAndRestructuring = {
  id: "01a06594-c67a-7010-af24-ece69175b587",
  type: "page-type/book-section",
  slug: "insight-and-restructuring",
  title: "Insight and restructuring",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
