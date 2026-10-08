import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencySummary = {
  id: "01a06594-c68a-700b-8d39-888fc029cdbc",
  type: "page-type/book-section",
  slug: "eu-residency-summary",
  title: "Summary",
  sectionOf: "book-section/second-passport/eu-residency",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.106Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
