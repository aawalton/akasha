import type { BookChapter } from "../../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const studentGraduate = {
  id: "01a06594-c68b-7013-af5b-09b49888b92b",
  pageTypeSlug: "book-chapter",
  slug: "student-graduate",
  title: "Student Graduate",
  description:
    "Australia student/graduate residency bridges: student visa 500 and Temporary Graduate 485, with the 2024 Genuine-Student and cap changes (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
