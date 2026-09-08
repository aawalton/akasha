import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euCitizenshipSummary = {
  id: "01a06594-c689-7005-b903-464c26182985",
  pageTypeSlug: "book-section",
  slug: "eu-citizenship-summary",
  title: "Summary",
  sectionOfSlug: "book-section/second-passport/eu-citizenship",
  partOfCollectionSlugs: ["book-section/second-passport/eu-citizenship"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
