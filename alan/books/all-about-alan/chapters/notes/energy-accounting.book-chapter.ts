import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const energyAccounting = {
  id: "01a06594-c679-7001-9f74-f60c64b33845",
  pageTypeSlug: "book-chapter",
  slug: "energy-accounting",
  title: "Energy accounting practice",
  description: "Energy-accounting practice — 10+ years of minute-level resource tracking.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
