import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const doubleEmpathyMechanism = {
  id: "01a06594-c684-700b-a792-9b24622f3e80",
  type: "page-type/book-section",
  slug: "double-empathy-mechanism",
  title: "Double-empathy mechanism",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: [
    "alan-book/all-about-alan",
    "book-section/all-about-alan/stateless-social-architecture",
  ],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
