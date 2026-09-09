import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyPoland = {
  id: "01a06594-c68a-7005-acde-911880f01e83",
  pageTypeSlug: "book-section",
  slug: "eu-residency-poland",
  title: "Poland",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Poland residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/poland.md.",
  partOfCollections: ["book-section/second-passport/eu-residency"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
