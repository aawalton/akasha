import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const perfectionIsSafe = {
  id: "01a06594-c67c-7000-abb1-7fec74def8d3",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "perfection-is-safe",
  title: "Only perfection is safe",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
