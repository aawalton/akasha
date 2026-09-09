import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const otherCitizenshipUruguay = {
  id: "01a06594-c68b-700b-b32a-63430ebcc149",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-uruguay",
  title: "Uruguay",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Uruguay citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
