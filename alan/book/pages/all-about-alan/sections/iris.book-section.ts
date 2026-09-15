import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const iris = {
  id: "01a06594-c687-7001-97e9-ee5793a8fd85",
  type: "page-type/book-section",
  slug: "iris",
  title: "Iris",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
