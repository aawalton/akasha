import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyPortugal = {
  id: "01a06594-c68a-7006-90ac-8fce484a6baf",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-portugal",
  title: "Portugal",
  description:
    "Portugal residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/portugal.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
