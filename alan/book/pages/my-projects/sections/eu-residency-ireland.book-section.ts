import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyIreland = {
  id: "01a06594-c689-7012-be4d-9ee463a89008",
  type: "page-type/book-section",
  slug: "eu-residency-ireland",
  title: "Ireland",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Ireland residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/ireland.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
