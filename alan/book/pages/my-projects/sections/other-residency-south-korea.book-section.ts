import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencySouthKorea = {
  id: "01a06594-c68c-7007-8b6a-9ba2cc57ce85",
  type: "page-type/book-section",
  slug: "other-residency-south-korea",
  title: "South Korea",
  sectionOf: "book-section/second-passport/other-residency",
  description: "South Korea residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.108Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
