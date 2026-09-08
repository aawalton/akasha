import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const volatilityGovernor = {
  id: "01a06594-c686-7001-8c3a-414cf88a5472",
  pageTypeSlug: "book-section",
  slug: "volatility-governor",
  title: "Volatility governor",
  sectionOfSlug: "all-about-alan",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
