import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherCitizenshipSanMarino = {
  id: "01a06594-c68b-7006-a3b4-c7b575711591",
  type: "page-type/book-section",
  slug: "other-citizenship-san-marino",
  title: "San Marino",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "San Marino citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.107Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
