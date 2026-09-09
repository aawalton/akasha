import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyIreland = {
  id: "01a06594-c689-7012-be4d-9ee463a89008",
  pageTypeSlug: "book-section",
  slug: "eu-residency-ireland",
  title: "Ireland",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Ireland residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/ireland.md.",
  partOfCollections: ["book-section/second-passport/eu-residency"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
