import type { BookChapter } from "../../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const skilledStream = {
  id: "01a06594-c68b-7011-8f9a-45826f73bd04",
  pageTypeSlug: "book-chapter",
  slug: "skilled-stream",
  title: "Skilled Stream",
  description:
    "Australia skilled-migration residency paths: points-tested 189/190/491, employer-sponsored 482 (SID)/186/494, and the National Innovation Visa 858 (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
