import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const grace = {
  id: "01a06594-c686-7013-befd-e5828d96b99d",
  type: "book-section",
  slug: "grace",
  title: "Grace",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
