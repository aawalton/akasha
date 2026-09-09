import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const otherCitizenshipNewZealand = {
  id: "01a06594-c68b-7004-b739-86dbbff441dc",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-new-zealand",
  title: "New Zealand",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "New Zealand citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
