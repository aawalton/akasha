import type { BookChapter } from "../../../../../../../book-chapter.page-type.ts"

export const specialCategory = {
  id: "01a06594-c68b-7012-a169-8a5c0f88db74",
  pageTypeSlug: "book-chapter",
  slug: "special-category",
  title: "Special Category",
  description:
    "Australia special-category residency: the New Zealand-citizen Special Category Visa 444 and its 2023 direct-citizenship path (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
