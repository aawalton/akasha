import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const otherCitizenshipNorway = {
  id: "01a06594-c68b-7005-9849-b889710f640f",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-norway",
  title: "Norway",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Norway citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
