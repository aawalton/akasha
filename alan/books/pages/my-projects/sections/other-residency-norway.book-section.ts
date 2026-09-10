import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const otherResidencyNorway = {
  id: "01a06594-c68c-7005-aab0-f1490036e292",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-residency-norway",
  title: "Norway",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Norway residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
