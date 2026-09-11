import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const underestimatedDifference = {
  id: "01a06594-c685-700c-bf84-4e3291bc4b34",
  type: "book-section",
  slug: "underestimated-difference",
  title: "Underestimated difference",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
