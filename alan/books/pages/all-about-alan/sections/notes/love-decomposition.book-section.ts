import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const loveDecomposition = {
  id: "01a06594-c67b-7001-a08b-705c1a9c195c",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "love-decomposition",
  title: "Love decomposition",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
