import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencyUk = {
  id: "01a06594-c68c-700a-8d9c-c3035c0d4d7a",
  pageTypeSlug: "book-section",
  slug: "other-residency-uk",
  title: "Uk",
  sectionOf: "book-section/second-passport/other-residency",
  description:
    "UK residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/uk.md.",
  partOfCollections: ["book-section/second-passport/other-residency"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
