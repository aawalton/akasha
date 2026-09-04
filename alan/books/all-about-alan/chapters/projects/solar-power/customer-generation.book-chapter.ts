import type { BookChapter } from "../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const customerGeneration = {
  id: "01a06594-c68c-700d-965d-0b6550e4d2d0",
  pageTypeSlug: "book-chapter",
  slug: "customer-generation",
  title: "Customer Generation — Provo Power",
  description:
    "Provo Power net-metering / customer-generation program — compensation mechanism, system size cap, annual reset, interconnection. Plus federal ITC status check.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
