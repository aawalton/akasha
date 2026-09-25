import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const humanitarian = {
  id: "01a06594-c68b-7010-a103-737405ac933e",
  type: "page-type/book-section",
  slug: "humanitarian",
  title: "Humanitarian",
  sectionOf: "book-section/other-residency/other-residency-australia",
  description:
    "Australia humanitarian/protection residency paths: offshore refugee (200–204), onshore protection (866), and phasing-out temporary protection (May 2026 snapshot).",
  partOfCollections: [
    "book-section/other-residency/other-residency-australia",
    "alan-book/my-projects",
  ],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
