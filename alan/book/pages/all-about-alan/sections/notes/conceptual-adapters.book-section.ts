import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const conceptualAdapters = {
  id: "01a06594-c676-7011-908e-54af851a3e6a",
  type: "page-type/book-section",
  slug: "conceptual-adapters",
  title: "Conceptual adapters",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
