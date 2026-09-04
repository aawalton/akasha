import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const otherResidencyMonaco = {
  id: "01a06594-c68c-7003-b14f-cd8136e8018d",
  pageTypeSlug: "book-chapter",
  slug: "other-residency-monaco",
  title: "Monaco",
  description: "Monaco residency paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
