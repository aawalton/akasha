import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const selfArchitecture = {
  id: "01a06594-c683-7001-8dd9-480e1d7c508f",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "self-architecture",
  title: "Self-architecture",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
