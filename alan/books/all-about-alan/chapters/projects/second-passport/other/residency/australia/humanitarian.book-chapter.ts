import type { BookChapter } from "../../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const humanitarian = {
  id: "01a06594-c68b-7010-a103-737405ac933e",
  pageTypeSlug: "book-chapter",
  slug: "humanitarian",
  title: "Humanitarian",
  description:
    "Australia humanitarian/protection residency paths: offshore refugee (200–204), onshore protection (866), and phasing-out temporary protection (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
