import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencyAustralia = {
  id: "01a06594-c68b-7015-9670-0b91737b307b",
  pageTypeSlug: "book-section",
  slug: "other-residency-australia",
  title: "Australia",
  sectionOf: "book-section/second-passport/other-residency",
  description:
    "Australia residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/australia.md.",
  partOfCollections: ["book-section/second-passport/other-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
