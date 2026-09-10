import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const otherCitizenshipSummary = {
  id: "01a06594-c68b-7008-a367-117b4b20a521",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-summary",
  title: "Summary",
  sectionOf: "book-section/second-passport/other-citizenship",
  partOfCollections: ["book-section/second-passport/other-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
