import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const otherResidencyCanada = {
  id: "01a06594-c68b-7016-8d73-4c9844aaaadb",
  pageTypeSlug: "book-chapter",
  slug: "other-residency-canada",
  title: "Canada",
  description: "Canada residency paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
