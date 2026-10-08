import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const specialCategory = {
  id: "01a06594-c68b-7012-a169-8a5c0f88db74",
  type: "page-type/book-section",
  slug: "special-category",
  title: "Special Category",
  sectionOf: "book-section/other-residency/other-residency-australia",
  description:
    "Australia special-category residency: the New Zealand-citizen Special Category Visa 444 and its 2023 direct-citizenship path (May 2026 snapshot).",
  partOfCollections: [
    "book-section/other-residency/other-residency-australia",
    "alan-book/my-projects",
  ],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.107Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
