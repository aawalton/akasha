import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const measurementMaturity = {
  id: "01a06594-c67b-7004-a6ee-e884c28ae200",
  pageTypeSlug: "book-chapter",
  slug: "measurement-maturity",
  title: "Measurement maturity",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
