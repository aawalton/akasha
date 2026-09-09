import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const environmentLever = {
  id: "01a06594-c679-7003-a078-d52c615e5c15",
  pageTypeSlug: "book-section",
  slug: "environment-lever",
  title: "The environment lever",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
