import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyEstonia = {
  id: "01a06594-c689-700c-9ac8-15910e3fc504",
  type: "page-type/book-section",
  slug: "eu-residency-estonia",
  title: "Estonia",
  sectionOf: "book-section/second-passport/eu-residency",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.105Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
