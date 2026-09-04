import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const costCurve = {
  id: "01a06594-c68e-7001-aac5-34abc63cc5e9",
  pageTypeSlug: "book-chapter",
  slug: "cost-curve",
  title: "Cost Curve — Past 15 Years",
  description:
    "Cost-curve history for residential solar — total retail, modules, inverters, batteries, soft costs.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
