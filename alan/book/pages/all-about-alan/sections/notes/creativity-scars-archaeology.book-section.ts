import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const creativityScarsArchaeology = {
  id: "01a06594-c677-7008-8a6b-7d03ed4d0965",
  type: "page-type/book-section",
  slug: "creativity-scars-archaeology",
  title: "Creativity-scars archaeology",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
