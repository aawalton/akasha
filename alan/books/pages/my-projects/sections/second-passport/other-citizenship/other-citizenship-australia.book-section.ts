import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const otherCitizenshipAustralia = {
  id: "01a06594-c68a-700e-8492-91d7ac2ae20d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-australia",
  title: "Australia",
  sectionOf: "book-section/second-passport/other-citizenship",
  description:
    "Australia citizenship paths (May 2026 snapshot). For residency paths, see ../residency/australia.md.",
  partOfCollections: ["book-section/second-passport/other-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
