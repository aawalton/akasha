import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencyIceland = {
  id: "01a06594-c68b-7017-9f6b-0b462b32e583",
  type: "page-type/book-section",
  slug: "other-residency-iceland",
  title: "Iceland",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Iceland residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
