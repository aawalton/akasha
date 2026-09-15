import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const progression = {
  id: "01a06594-c67e-7004-87d6-fc8d7a223020",
  type: "page-type/book-section",
  slug: "progression",
  title: "Safety — progression and the two pillars",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/safety"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
