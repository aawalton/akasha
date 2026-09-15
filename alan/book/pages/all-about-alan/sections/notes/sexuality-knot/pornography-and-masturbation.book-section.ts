import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const pornographyAndMasturbation = {
  id: "01a06594-c683-700d-ac6c-d0e009c33124",
  type: "page-type/book-section",
  slug: "pornography-and-masturbation",
  title: "Pornography and masturbation",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/sexuality-knot"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
