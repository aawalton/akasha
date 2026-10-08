import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencySummary = {
  id: "01a06594-c68c-7008-b174-35243ceec850",
  type: "page-type/book-section",
  slug: "other-residency-summary",
  title: "Summary",
  sectionOf: "book-section/second-passport/other-residency",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.108Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
