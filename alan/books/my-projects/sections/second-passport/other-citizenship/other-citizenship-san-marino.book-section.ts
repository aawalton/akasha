import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherCitizenshipSanMarino = {
  id: "01a06594-c68b-7006-a3b4-c7b575711591",
  pageTypeSlug: "book-section",
  slug: "other-citizenship-san-marino",
  title: "San Marino",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "San Marino citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
