import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const cultivatingLocalRelationships = {
  id: "01a06594-c677-700c-b78f-38667baeb8e1",
  type: "book-section",
  slug: "cultivating-local-relationships",
  title: "Cultivating local B-tier relationships",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
