import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherCitizenshipUk = {
  id: "01a06594-c68b-700a-bead-e7a607bce2c3",
  pageTypeSlug: "book-section",
  slug: "other-citizenship-uk",
  title: "United Kingdom — Paths to Citizenship (May 2026)",
  sectionOf: "book-section/second-passport/other-citizenship",
  description:
    "UK citizenship paths (May 2026 snapshot). For residency paths, see ../residency/uk.md.",
  partOfCollections: ["book-section/second-passport/other-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
