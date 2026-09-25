import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencyJapan = {
  id: "01a06594-c68c-7000-bb95-2c864c7e4f4c",
  type: "page-type/book-section",
  slug: "other-residency-japan",
  title: "Japan",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Japan residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
