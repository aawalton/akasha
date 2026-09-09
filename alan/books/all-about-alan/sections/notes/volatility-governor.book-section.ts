import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const volatilityGovernor = {
  id: "01a06594-c686-7001-8c3a-414cf88a5472",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "volatility-governor",
  title: "Volatility governor",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
