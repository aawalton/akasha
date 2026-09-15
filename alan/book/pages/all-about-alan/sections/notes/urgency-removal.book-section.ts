import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const urgencyRemoval = {
  id: "01a06594-c685-700e-8919-1657b498c0fa",
  type: "page-type/book-section",
  slug: "urgency-removal",
  title: "Urgency removal",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
