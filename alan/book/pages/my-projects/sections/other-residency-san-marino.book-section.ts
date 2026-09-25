import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencySanMarino = {
  id: "01a06594-c68c-7006-a536-596399d57556",
  type: "page-type/book-section",
  slug: "other-residency-san-marino",
  title: "San Marino",
  sectionOf: "book-section/second-passport/other-residency",
  description: "San Marino residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
