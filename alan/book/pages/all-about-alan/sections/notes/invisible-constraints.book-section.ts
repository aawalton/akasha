import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const invisibleConstraints = {
  id: "01a06594-c67a-7014-a655-2e082a534002",
  type: "book-section",
  slug: "invisible-constraints",
  title: "Invisible constraints",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
