import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const studentGraduate = {
  id: "01a06594-c68b-7013-af5b-09b49888b92b",
  type: "page-type/book-section",
  slug: "student-graduate",
  title: "Student Graduate",
  sectionOf: "book-section/other-residency/other-residency-australia",
  description:
    "Australia student/graduate residency bridges: student visa 500 and Temporary Graduate 485, with the 2024 Genuine-Student and cap changes (May 2026 snapshot).",
  partOfCollections: [
    "book-section/other-residency/other-residency-australia",
    "alan-book/my-projects",
  ],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
