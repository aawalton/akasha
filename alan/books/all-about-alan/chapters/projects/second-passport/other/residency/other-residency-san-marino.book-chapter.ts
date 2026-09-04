import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const otherResidencySanMarino = {
  id: "01a06594-c68c-7006-a536-596399d57556",
  pageTypeSlug: "book-chapter",
  slug: "other-residency-san-marino",
  title: "San Marino",
  description: "San Marino residency paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
