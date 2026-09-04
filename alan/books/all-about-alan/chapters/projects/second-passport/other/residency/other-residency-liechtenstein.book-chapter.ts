import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const otherResidencyLiechtenstein = {
  id: "01a06594-c68c-7001-bcdf-fb35a2347ac9",
  pageTypeSlug: "book-chapter",
  slug: "other-residency-liechtenstein",
  title: "Liechtenstein",
  description: "Liechtenstein residency paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
