import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyCyprus = {
  id: "01a06594-c689-7009-b38c-b0ae0be702da",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-cyprus",
  title: "Cyprus",
  description:
    "Cyprus residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/cyprus.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
