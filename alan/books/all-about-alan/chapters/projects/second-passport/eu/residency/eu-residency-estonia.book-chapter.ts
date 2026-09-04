import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euResidencyEstonia = {
  id: "01a06594-c689-700c-9ac8-15910e3fc504",
  pageTypeSlug: "book-chapter",
  slug: "eu-residency-estonia",
  title: "Estonia",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
