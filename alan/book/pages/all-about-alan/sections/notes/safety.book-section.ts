import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const safety = {
  id: "01a06594-c682-7002-9ce1-f8926835c02b",
  type: "page-type/book-section",
  slug: "safety",
  title: "Safety",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
