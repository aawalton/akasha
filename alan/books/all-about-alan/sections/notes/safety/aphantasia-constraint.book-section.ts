import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const aphantasiaConstraint = {
  id: "01a06594-c67e-7001-b9f9-775f31ca7746",
  pageTypeSlug: "book-section",
  slug: "aphantasia-constraint",
  title: "Safety — the aphantasia constraint on intervention design",
  sectionOfSlug: "all-about-alan",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
