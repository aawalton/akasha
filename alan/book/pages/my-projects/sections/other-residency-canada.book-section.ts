import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencyCanada = {
  id: "01a06594-c68b-7016-8d73-4c9844aaaadb",
  type: "page-type/book-section",
  slug: "other-residency-canada",
  title: "Canada",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Canada residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.107Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
