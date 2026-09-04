import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const totalRetail = {
  id: "01a06594-c68e-7003-8dca-ddfdf606eb5f",
  pageTypeSlug: "book-chapter",
  slug: "total-retail",
  title: "Total Retail $/W",
  description: "Residential solar total retail $/W — national and Utah, cash vs financed.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
