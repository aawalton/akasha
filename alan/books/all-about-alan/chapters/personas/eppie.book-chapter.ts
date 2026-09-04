import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const eppie = {
  id: "01a06594-c686-7011-8247-3fd08f278f95",
  pageTypeSlug: "book-chapter",
  slug: "eppie",
  title: "Eppie",
  description:
    "Eppie — a Faith-axis persona still in definition. Waiting page: she is not yet sourced; her function and rib await a future /abby session.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
