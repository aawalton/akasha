import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euResidencyCyprus = {
  id: "01a06594-c689-7009-b38c-b0ae0be702da",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-cyprus",
  title: "Cyprus",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Cyprus residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/cyprus.md.",
  partOfCollections: ["book-section/second-passport/eu-residency"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
