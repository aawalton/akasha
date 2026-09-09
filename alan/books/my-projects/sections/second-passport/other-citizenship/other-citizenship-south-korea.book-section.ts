import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherCitizenshipSouthKorea = {
  id: "01a06594-c68b-7007-9d1a-c1729eef38e0",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-south-korea",
  title: "South Korea",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "South Korea citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
