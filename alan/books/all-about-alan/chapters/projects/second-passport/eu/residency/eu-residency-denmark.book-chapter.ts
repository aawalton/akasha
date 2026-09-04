import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyDenmark = {
  id: "01a06594-c689-700b-be14-d378fa7915ca",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-denmark",
  title: "Denmark",
  description:
    "Denmark residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/denmark.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
