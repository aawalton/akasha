import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const healthcare = {
  id: "01a06594-c67a-7005-b160-6719bf3b4a78",
  type: "book-section",
  slug: "healthcare",
  title: "Healthcare",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
