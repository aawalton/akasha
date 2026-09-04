import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const otherCitizenshipSanMarino = {
  id: "01a06594-c68b-7006-a3b4-c7b575711591",
  pageTypeSlug: "book-chapter",
  slug: "other-citizenship-san-marino",
  title: "San Marino",
  description: "San Marino citizenship paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
