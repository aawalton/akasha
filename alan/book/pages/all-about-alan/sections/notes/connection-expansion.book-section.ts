import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const connectionExpansion = {
  id: "01a06594-c677-7003-a5f5-e802dc32f635",
  type: "page-type/book-section",
  slug: "connection-expansion",
  title: "Connection expansion",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
