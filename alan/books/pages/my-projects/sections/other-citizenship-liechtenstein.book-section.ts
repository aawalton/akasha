import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const otherCitizenshipLiechtenstein = {
  id: "01a06594-c68b-7001-b286-9a41c70336e5",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-liechtenstein",
  title: "Liechtenstein",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Liechtenstein citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
