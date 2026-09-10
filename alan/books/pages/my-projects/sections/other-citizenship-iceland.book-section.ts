import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const otherCitizenshipIceland = {
  id: "01a06594-c68a-7010-8335-4d579c8c074d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-iceland",
  title: "Iceland",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Iceland citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
