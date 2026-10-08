import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const retrofits = {
  id: "01a06594-c68d-7010-a5b4-7dfb20d24956",
  type: "page-type/book-section",
  slug: "retrofits",
  title: "Retrofit Packages — Leverage Ranking",
  sectionOf: "book-section/solar-power/envelope",
  description:
    "Envelope retrofit packages ranked by heating-load-reduction-per-dollar — air sealing dominates, windows lose on energy alone.",
  partOfCollections: ["book-section/solar-power/envelope", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.109Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
