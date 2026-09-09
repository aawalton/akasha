import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencySanMarino = {
  id: "01a06594-c68c-7006-a536-596399d57556",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-residency-san-marino",
  title: "San Marino",
  sectionOf: "book-section/second-passport/other-residency",
  description: "San Marino residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
