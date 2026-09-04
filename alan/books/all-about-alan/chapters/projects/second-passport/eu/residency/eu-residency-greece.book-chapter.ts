import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyGreece = {
  id: "01a06594-c689-7010-97f2-88f4d5c7f697",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-greece",
  title: "Greece",
  description:
    "Greece residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/greece.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
