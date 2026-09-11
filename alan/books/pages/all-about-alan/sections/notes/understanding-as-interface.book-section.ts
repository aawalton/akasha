import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const understandingAsInterface = {
  id: "01a06594-c685-700d-8fc8-59ff822625de",
  type: "book-section",
  slug: "understanding-as-interface",
  title: "Understanding as interface",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
