import type { BookChapter } from "../../../../../../../book-chapter.page-type.ts"

export const euResidencyPortugal = {
  id: "01a06593-c4fd-700e-aadb-b166484a6baf",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-portugal",
  title: "Portugal",
  description:
    "Portugal residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/portugal.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
