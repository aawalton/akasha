import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyLithuania = {
  id: "01a06594-c68a-7001-a510-b048ad0ef478",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-lithuania",
  title: "Lithuania",
  description:
    "Lithuania residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/lithuania.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
