import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const understandingAsInterface = {
  id: "01a06594-c685-700d-8fc8-59ff822625de",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "understanding-as-interface",
  title: "Understanding as interface",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
