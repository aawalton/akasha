import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const importanceOverUrgency = {
  id: "01a06594-c67a-700d-8b89-8604d382fa9e",
  type: "page-type/book-section",
  slug: "importance-over-urgency",
  title: "Importance over urgency",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
