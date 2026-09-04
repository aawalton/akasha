import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const otherResidencyNorway = {
  id: "01a06594-c68c-7005-aab0-f1490036e292",
  pageTypeSlug: "book-chapter",
  slug: "other-residency-norway",
  title: "Norway",
  description: "Norway residency paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
