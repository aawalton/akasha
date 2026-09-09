import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const recoveryEconomics = {
  id: "01a06594-c67c-700b-b2a4-139f2d95de63",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "recovery-economics",
  title: "The economics of recovery",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
