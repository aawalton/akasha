import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euResidencyLithuania = {
  id: "01a06594-c68a-7001-a510-b048ad0ef478",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-lithuania",
  title: "Lithuania",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Lithuania residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/lithuania.md.",
  partOfCollections: ["book-section/second-passport/eu-residency"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
