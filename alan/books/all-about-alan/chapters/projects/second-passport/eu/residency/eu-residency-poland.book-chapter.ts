import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyPoland = {
  id: "01a06594-c68a-7005-acde-911880f01e83",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-poland",
  title: "Poland",
  description:
    "Poland residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/poland.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
