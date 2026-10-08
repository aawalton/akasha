import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const cost = {
  id: "01a06594-c68e-7007-a401-a52e234c9ad2",
  type: "page-type/book-section",
  slug: "cost",
  title: "Total Cost Stack",
  sectionOf: "book-section/solar-power/sizing",
  description:
    "Total cost stack — PV + service panel + EV chargers, pre-ITC and post-ITC, three demand scenarios, with the battery priced outside the totals.",
  partOfCollections: ["book-section/solar-power/sizing", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.110Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
