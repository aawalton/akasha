import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const alternationNotModeration = {
  id: "01a06594-c674-700b-81c7-077c6e5aca86",
  type: "page-type/book-section",
  slug: "alternation-not-moderation",
  title: "Alternation, not moderation",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
