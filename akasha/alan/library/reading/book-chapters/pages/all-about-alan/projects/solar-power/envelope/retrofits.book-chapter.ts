import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const retrofits = {
  id: "01a06594-c68d-7010-a5b4-7dfb20d24956",
  pageTypeSlug: "book-chapter",
  slug: "retrofits",
  title: "Retrofit Packages — Leverage Ranking",
  description:
    "Envelope retrofit packages ranked by heating-load-reduction-per-dollar — air sealing dominates, windows lose on energy alone.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
