import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const retrofits = {
  id: "01a06594-c68d-7010-a5b4-7dfb20d24956",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "retrofits",
  title: "Retrofit Packages — Leverage Ranking",
  sectionOf: "book-section/solar-power/envelope",
  description:
    "Envelope retrofit packages ranked by heating-load-reduction-per-dollar — air sealing dominates, windows lose on energy alone.",
  partOfCollections: ["book-section/solar-power/envelope"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
