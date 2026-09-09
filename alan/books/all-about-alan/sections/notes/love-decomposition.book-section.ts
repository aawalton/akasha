import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const loveDecomposition = {
  id: "01a06594-c67b-7001-a08b-705c1a9c195c",
  pageTypeSlug: "book-section",
  slug: "love-decomposition",
  title: "Love decomposition",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
