import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherCitizenshipJapan = {
  id: "01a06594-c68b-7000-831e-c059ccfbad1e",
  pageTypeSlug: "book-section",
  slug: "other-citizenship-japan",
  title: "Japan",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Japan citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
