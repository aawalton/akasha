import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const utilities = {
  id: "01a06594-c685-700f-9b3c-f956d1ebdc43",
  type: "book-section",
  slug: "utilities",
  title: "Utilities",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
