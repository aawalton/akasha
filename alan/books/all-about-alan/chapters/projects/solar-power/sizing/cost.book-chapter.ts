import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const cost = {
  id: "01a06594-c68e-7007-a401-a52e234c9ad2",
  pageTypeSlug: "book-chapter",
  slug: "cost",
  title: "Total Cost Stack",
  description:
    "Total cost stack — PV + battery + service panel + EV chargers, pre-ITC and post-ITC, three demand scenarios. ITC status uncertainty called out.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
