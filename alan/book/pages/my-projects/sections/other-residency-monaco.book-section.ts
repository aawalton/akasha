import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencyMonaco = {
  id: "01a06594-c68c-7003-b14f-cd8136e8018d",
  type: "page-type/book-section",
  slug: "other-residency-monaco",
  title: "Monaco",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Monaco residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
